const util = require('../../utils/util')
const api = require('../../config/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // text:"这是一个页面"
    navList: [],
    goodsList: [],
    id: 0,
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 10000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: parseInt(options.id)
      })
      wx.getSystemInfo({
        success: (result) => {
          this.setData({
            scrollHeight: result.windowHeight
          })
        },
        fail: () => { },
        complete: () => { }
      });

      this.getCategoryInfo()
    }
  },
  getCategoryInfo() {
    util.request(api.GoodsCategory, { id: this.data.id }).then(res => {
      if (res.errno == 0) {
        this.setData({
          navList: res.data.brotherCategory,
          currentCategory: res.data.currentCategory
        })

        //nav位置
        let currentIndex = this.data.navList.findIndex(e => e.id == this.data.id) + 1
        if (currentIndex > this.data.navList.length && this.data.navList.length > 5) {
          this.setData({
            scrollLeft: currentIndex * 60
          })
        }
        this.getGoodsList()
      }
    })
  },
  getGoodsList() {
    util.request(api.GoodsList, { categoryId: this.data.id, page: this.data.page, size: this.data.size }).then(res => {
      this.setData({
        goodsList: res.data.goodsList,
      })
    })
  },
  switchCate(event) {
    if (this.data.id == event.currentTarget.dataset.id) {
      return false
    }
    console.log(event);
    let clientX = event.detail.x
    let currentTarget = event.currentTarget
    if (clientX < 60) {
      this.setData({
        scrollLeft: currentTarget.offsetLeft - 60
      });
    } else if (clientX > 330) {
      this.setData({
        scrollLeft: currentTarget.offsetLeft
      });
    }
    this.setData({
      id:event.currentTarget.dataset.id
    })
    this.getCategoryInfo()
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