// pages/catalog/catalog.js
let util = require('../../utils/util')
let api = require('../../config/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [],
    categoryList: [],
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCatalog()
  },
  getCatalog() {
    wx.showLoading({
      title: '加载中...',
    });
    util.request(api.CatalogList).then(res => {
      this.setData({
        navList: res.data.categoryList,
        currentCategory: res.data.currentCategory
      })
      wx.hideLoading();
    })
    util.request(api.GoodsCount).then(res => {
      this.setData({
        goodsCount: res.data.goodsCount
      })
    })
  },
  getCurrentCategory(id) {
    util.request(api.CatalogCurrent, { id: id }).then(res => {
      this.setData({
        currentCategory: res.data.currentCategory
      })
    })
  },
  switchCate(event) {
    console.log(event);
    let currentTarget = event.currentTarget
    if (this.data.currentCategory.id == currentTarget.dataset.id) return false
    this.getCurrentCategory(currentTarget.dataset.id)
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

  }
})