// pages/comment/comment.js
const app = getApp()
const api = require('../../config/api')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    allCommentList: [],
    picCommentList: [],
    typeId: 0,
    valueId: 0,
    showType: 0,
    allCount: 0,
    hasPicCount: 0,
    allPage: 1,
    picPage: 1,
    size: 20
  },

  getCommentCount() {
    util.request(api.CommentCount, { valueId: this.data.valueId, typeId: this.data.typeId }).then(res => {
      if (res.errno == 0) {
        this.setData({
          allCount: res.data.allCount,
          hasPicCount: res.data.hasPicCount
        })
      }
    })
  },
  getCommentList() {
    util.request(api.CommentList, {
      valueId: this.data.valueId,
      typeId: this.data.typeId,
      size: this.data.size,
      page: this.data.showType == 0 ? this.data.allPage : this.data.picPage,
      showType: this.data.showType
    }).then(res => {
      if (res.errno === 0) {
        if (this.data.showType === 0) {
          this.setData({
            allCommentList: this.data.allCommentList.concat(res.data.data),
            allPage: res.data.currentPage,
            comments: this.data.allCommentList.concat(res.data.data)
          })
        } else {
          this.setData({
            picCommentList: this.data.picCommentList.concat(res.data.data),
            picPage: res.data.currentPage,
            comments: this.data.picCommentList.concat(res.data.data)
          });
        }
      }
    })
  },
  switchTab() {
    this.setData({
      showType: this.data.showType == 1 ? 0 : 1
    })
    this.getCommentList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      typeId: options.typeId,
      valueId: options.valueId
    })
    this.getCommentCount()
    this.getCommentList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //监听用户上拉触底事件
  onReachBottom() {
    console.log('11111');
    if (this.data.showType == 0) {
      if (this.data.allCount / this.data.size < this.data.allPage) return false
      this.setData({
        allPage: this.data.allPage + 1
      })
    } else {
      if (this.data.hasPicCount / this.data.size < this.data.picPage) return false
      this.setData({
        'picPage': this.data.picPage + 1
      });
    }
    this.getCommentList()
  },
})