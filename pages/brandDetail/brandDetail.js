let api = require('../../config/api')
let util = require('../../utils/util')
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    brand: {},
    goodsList: [],
    page: 1,
    size: 1000
  },
  getGoodsList(){
    util.request(api.GoodsList,{brandId:this.data.id,page:this.data.page,size:this.data.size}).then(res=>{
      if(res.errno==0){
        console.log(res)
        this.setData({
          goodsList:res.data.goodsList
        })
      }
    })
  },
  // 获取供货商信息
  getBrand(){
    util.request(api.BrandDetail,{id:this.data.id}).then(res=>{
      if(res.errno==0){
        this.setData({
          brand:res.data.brand
        })
        this.getGoodsList()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({id:parseInt(options.id)})
    this.getBrand()
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