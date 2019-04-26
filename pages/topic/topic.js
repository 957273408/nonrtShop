let util = require('../../utils/util.js')
let api = require('../../config/api.js')

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TopicList: [],
    scrollTop: 0,
    page: 1,
    size: 10,
    count: 0,
    showPage: false
  },

  // 下一页方法
  nextPage(){
    if(this.data.page+1>this.data.count/this.data.size){
      return 
    }
    this.setData({
      page: parseInt(this.data.page)+1
    })
    this.getTopic()
  },
  prevPage(){
    if(this.data.page<2){
      return 
    }
    this.setData({
      page: parseInt(this.data.page)-1
    })
    this.getTopic()
  },

  getTopic() {
    this.setData({
      scrollTop: 0,
      showPage: false,
      TopicList: []
    })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    })
    util.request(api.TopicList, {
      page: this.data.page,
      size: this.data.size
    }).then(res => {
      console.log(res)
      if (res.errno === 0) {
        this.setData({
          TopicList: res.data.data,
          count: res.data.count,
          showPage: true,
          scrollTop: 0
        })
      }
      wx.hideToast() //隐藏提示框
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTopic()
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