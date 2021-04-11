import Peer from 'skyway-js'
import i18n from '../../i18n'

/**
 * Peer instance
 * @type {object}
 */
let localPeer;

/**
 * MediaConnection instance
 * @type {object}
 */
let localMediaConnection;

/**
 * DataConnection instance
 * @type {object}
 */
let localDataConnection;

export const skyway = {
  namespaced: true,
  state: () => ({
    /** My Peer Information */
    myInfo: {
      peerId: '',
      mediaStream: null,
    },
    /** Friend Peer Information */
    friendInfo: {
      peerId: '',
      mediaStream: null,
    }
  }),

  getters: {
    peerId (state) {
      return state.myInfo.peerId;
    },
    mediaStream (state) {
      return state.myInfo.mediaStream;
    },
    friendId (state) {
      return state.friendInfo.peerId;
    },
    friendMediaStream (state) {
      return state.friendInfo.mediaStream;
    },
  },

  mutations: {
    setPeerId (state, payload) {
      state.myInfo.peerId = payload;
    },
    setMediaStream (state, payload) {
      state.myInfo.mediaStream = payload;
    },
    setFriendId (state, payload) {
      state.friendInfo.peerId = payload;
    },
    setFriendMediaStream (state, payload) {
      state.friendInfo.mediaStream = payload;
    },
  },

  actions: {
    /**
     * 新規に Peer インスタンスを生成し、イベントを設置
     * Create a new Peer instance and set an event.
     * @param {object} context
     * @param {string} id My Peer ID
     * @returns Promise
     */
    async initPeer ({ dispatch, commit }, id) {
      return new Promise((resolve) => {
        if (!localPeer) {
          // Create a new Peer instance.
          localPeer = new Peer(id, {
            key: process.env.VUE_APP_SKYWAY_API_KEY,
            debug: 3
          });
  
          // シグナリングサーバ接続後(Peer インスタンス生成後)に発火するイベント
          // Events after connecting to the signaling server.
          localPeer.on('open', async () => {
            await commit('setPeerId', localPeer.id);
            resolve();
          });

          // データチャネル受信イベント
          // Data channel received event.
          localPeer.on('connection', connection => {
            dispatch('checkDataConnection', connection);
          });

          // メディアチャネル受信イベント
          // Media chanel received event.
          localPeer.on('call', async (connection) => {
            localMediaConnection = connection;
            await commit('setFriendId', connection.remoteId);
            // 着信ダイアログを表示
            // Show incoming call dialog.
            commit('setIncomingCallModalShow', true, { root: true });

            dispatch('setEventListener', connection);
            dispatch('setMakeCallDisabled', true, { root: true });
          });

          localPeer.on('error', error => {
            console.log(`${error.type}: ${error.message}`);
          });
        }
      });
    },
    /**
     * 相手 Peer に接続する
     * Connect to friend peer.
     * @param {object} context
     */
    async connect ({ dispatch, getters }) {
      // データチャネル接続
      // Connect to data channel.
      const dataConnection = localPeer.connect(getters.friendId);
      dataConnection.on('open', async () => {
        await dispatch('checkDataConnection', dataConnection);

        // メディアチャネル接続
        // Connect to media channel.
        localMediaConnection = localPeer.call(getters.friendId, getters.mediaStream);

        dispatch('setEventListener', localMediaConnection);
      })
    },
    /**
     * 応答する
     * Accept call.
     * @param {object} context
     */
    async replyConnection ({ getters }) {
      localMediaConnection.answer(getters.mediaStream);

      const message = {
        type:'start',
      };
      localDataConnection.send(message);
    },
    /**
     * MediaConnection の接続を切断
     * @param {object} context
     */
    async closeMediaConnection ({ dispatch }) {
      await localMediaConnection.close(true);
      dispatch('resetFriendId');
    },
    /**
     * 接続を拒否
     * Reject call.
     * @param {object} context
     */
    async rejectDataConnection ({ dispatch }) {
      const message = {
        type:'reject',
      };
      localDataConnection.send(message);

      dispatch('resetFriendId');
      dispatch('initPeer');
    },
    /**
     * 接続をキャンセル
     * Cancel connection.
     * @param {object} context
     */
    async cancelConnection ({ dispatch }) {
      dispatch('resetFriendId');
    },
    /**
     * 受信した DataConnection をチェック
     * Check received data.
     * @param {object} context
     * @param {object} connection DataConnection
     */
    async checkDataConnection ({ dispatch, commit }, connection) {
      localDataConnection = connection;

      // データ受信イベント
      // Data received event.
      localDataConnection.on('data', data => {
        switch (data.type) {
            case 'calling':
              break;
            case 'start':
              // 発信中ダイアログを閉じる
              // Close make calling modal.
              commit('setMakeCallingModalShow', false, { root: true });
              break;
            case 'reject':
              commit('message/setNotConnection', i18n.t("message.notConnection"), { root: true });
              dispatch('resetFriendId');
              dispatch('initPeer');
              break;
        }
      })

      localDataConnection.on('close', error => {
        console.log('closed', error);
      });

      localDataConnection.on('error', error => {
        console.log(`error dataConnection ${error.type}: ${error.message}`);
      });
    },
    /**
     * MediaConnection のイベントを設置
     * @param {object} context
     * @param {object} mediaConnection
     */
    async setEventListener ({ dispatch, commit }, mediaConnection) {
      mediaConnection.on('stream', stream => {
        commit('setFriendMediaStream', stream);
      });

      mediaConnection.on('close', () => {
        dispatch('setMakeCallDisabled', false, { root: true });
        commit('setFriendMediaStream', null);
        alert(i18n.t('message.disconnected'));
      });
    },
    /**
     * 相手の Peer ID をリセット
     * @param {object} context
     */
    async resetFriendId ({ commit }) {
      await commit('setFriendId', '');
    }
  }
}
