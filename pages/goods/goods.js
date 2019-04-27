let app = getApp()
let WxParse= require('../../lib/wxParse/wxParse.js')
let util = require('../../utils/util.js')
let api = require('../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    goods: {},
    gallery: [],
    attribute: [],
    issueList: [],
    comment: [],
    brand: {},
    specificationList: [],
    productList: [],
    relatedGoods: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '请选择规格数量',
    openAttr: false,
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png"
  },
  // 开启参数选择界面
  switchAttrPop(){

  },
  // 大家都在看数据
  getGoodsRelated(){
    util.request(api.GoodsRelated,{id:this.data.id}).then(res=>{
      console.log(res)
      if(res.errno===0){
        this.setData({
          relatedGoods:res.data.goodsList
        })
      }
    })
  },

  // 获取详情页面数据
  getGoodsInfo(){
    util.request(api.GoodsDetail,{id:this.data.id}).then(res=>{
      console.log(res)
      if(res.errno===0){
        this.setData({
          goods:res.data.info,
          gallery:res.data.gallery,
          attribute: res.data.attribute,
          issueList: res.data.issue,
          comment: res.data.comment,
          brand: res.data.brand,
          specificationList: res.data.specificationList,
          productList: res.data.productList,
          userHasCollect: res.data.userHasCollect
        })
      }
      if (res.data.userHasCollect==0){
        this.setData({
          collectBackImage:this.data.noCollectImage
        })
      }else{
        this.setData({
          collectBackImage:this.data.hasCollectImage
        })
      }
      WxParse.wxParse('goodsDetail','html',res.data.info.goods_desc,this) 
      this.getGoodsRelated()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:parseInt(options.id)
    })
    this.getGoodsInfo()
    // 获取购物车信息
    util.request(api.CartGoodsCount).then(res=>{
      if(res.errno===0){
        console.log(res)
        this.setData({
          cartGoodsCount:res.data.cartTotal.goodsCount
        })
      }
    })
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