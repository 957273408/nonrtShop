let app = getApp()
let Wxparse = require('../../lib/wxParse/wxParse.js')
let util = require('../../utils/util.js')
let api = require('../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    topicList: [],
    topic: [],
    commentList: [],
    commentCount: '',
  },
  postComment() {
    wx.navigateTo({
      url: `/pages/commentPost/commentPost?valueId=${this.data.id}&typeId=1`,
    })
  },
  getCommentList() {
    util.request(api.CommentList, {
      valueId: this.data.id,
      typeId: 1,
      size: 5
    }).then(res => {
      if (res.errno != 0) return
      console.log(res)
      this.setData({
        commentList: res.data.data,
        commentCount: res.data.count
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      id: parseInt(options.id)
    })
    util.request(api.TopicDetail, {
      id: this.data.id
    }).then(res => {
      if (res.errno != 0) return
      this.setData({
        topic: res.data
      })
      Wxparse.wxParse('topicDetail', 'html', res.data.content, this)
    })
    util.request(api.TopicRelated, {
      id: this.data.id
    }).then(res => {
      console.log(res)
      if (res.errno != 0) return
      this.setData({
        topicList: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getCommentList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})