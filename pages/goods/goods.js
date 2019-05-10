let app = getApp()
let WxParse = require('../../lib/wxParse/wxParse.js')
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
  switchAttrPop() {
    this.setData({
      openAttr: true
    })
  },
  closeAttr() {
    this.setData({
      openAttr: false
    })
  },
  // 加入购物车
  addTocart() {
    if (this.data.openAttr === false) {
      this.setData({
        openAttr: !this.data.openAttr
      })
      return false
    }
    if (this.isCheckedAllSpec()) {
      wx.showToast({
        image: '/static/images/icon_error.png',
        title: '请选择规格',
        mask: false //
      })
      return false;
    }
    // 根据选中的规格判断是否有对应的sku信息
    let checkedProduct = this.getCheckedProductItem(this.getCheckedSpecKey())
    if (!checkedProduct || checkedProduct.length == 0) {
      wx.showToast({
        image: '/static/images/icon_error.png',
        title: '库存不足',
        mask: true
      })
      return false
    }
    // 验证选择数量是否超过库存
    if (checkedProduct.goods_number < this.data.number) {
      wx.showToast({
        image: '/static/images/icon_error.png',
        title: '库存不足',
        mask: true
      })
      return false
    }
    // 添加到购物车
    util.request(api.CartAdd, {
      goodsId: this.data.goods.id,
      number: this.data.number,
      productId: checkedProduct[0].id
    }, "POST").then(res => {
      if (res.errno == 0) {
        wx.showToast({
          title: '添加成功'
        })
        this.setData({
          openAttr: !that.data.openAttr,
          cartGoodsCount: res.data.cartTotal.goodsCount
        })
      } else {
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: res.errmsg,
          mask: true
        });
      }
    })
  },

  getCheckedProductItem(key) {
    return this.data.productList.filter(v => {
      return v.goods_specification_ids === key
    })
  },
  getCheckedSpecKey() {
    let checkedValue = this.getCheckedSpecValue().map(v => {
      return v.valueId
    })
    return checkedValue.join('_')
  },
  // 判断是否选择完整的
  isCheckedAllSpec() {
    return this.getCheckedSpecValue().some(e => {
      return e.valueId === 0
    })
  },
  // 打开购物车页面
  openCartPage() {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  // 添加到收藏
  addCannelCollect() {
    util.request(api.CollectAddOrDelete, {
      typeId: 0,
      valueId: this.data.id
    }, 'POST').then(res => {
      if (res.errno == 0) {
        if (res.data.type == 'add') {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        } else {
          that.setData({
            'collectBackImage': that.data.noCollectImage
          });
        }
      }else{
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: _res.errmsg,
          mask: true
        })
      }
    })
  },
  // 配置项选择
  clickSkuValue(evet) {
    let {
      nameId,
      valueId,
      index,
      nameindex
    } = evet.target.dataset
    this.data.specificationList[nameindex].valueList.forEach((e, i) => {
      if (i == index) e.checked = e.checked ? false : true
      else e.checked = false
    })
    this.setData({
      specificationList: this.data.specificationList
    })
    this.changeSpecInfo()
  },
  // 获取所有被选中的
  getCheckedSpecValue() {
    let checkedValues = this.data.specificationList.reduce((res, {
      specification_id,
      valueList
    }) => {
      let obj = {
        nameId: specification_id,
        valueId: 0,
        valueText: ''
      }
      valueList.forEach(e => {
        if (e.checked) {
          obj.valueId = e.id
          obj.valueText = e.value
        }
      })
      res.push(obj)
      return res
    }, [])
    return checkedValues
  },
  changeSpecInfo() {
    let checkedNameValue = this.getCheckedSpecValue()
    let checkedValue = checkedNameValue.filter(e => {
      return e.valueId != 0
    }).map(k => {
      return k.valueText
    })
    this.setData({
      checkedSpecText: checkedValue.length ? checkedValue.join('  ') : '请选择规格数量'
    })
  },
  // 数量选择器
  cutNumber() {
    this.setData({
      number: this.data.number != 1 ? --this.data.number : 1
    })
  },
  addNumber() {
    this.setData({
      number: ++this.data.number
    })
  },
  // 大家都在看数据
  getGoodsRelated() {
    util.request(api.GoodsRelated, {
      id: this.data.id
    }).then(res => {
      if (res.errno === 0) {
        this.setData({
          relatedGoods: res.data.goodsList
        })
      }
    })
  },

  // 获取详情页面数据
  getGoodsInfo() {
    util.request(api.GoodsDetail, {
      id: this.data.id
    }).then(res => {
      if (res.errno === 0) {
        this.setData({
          goods: res.data.info,
          gallery: res.data.gallery,
          attribute: res.data.attribute,
          issueList: res.data.issue,
          comment: res.data.comment,
          brand: res.data.brand,
          specificationList: res.data.specificationList,
          productList: res.data.productList,
          userHasCollect: res.data.userHasCollect
        })
      }
      if (res.data.userHasCollect == 0) {
        this.setData({
          collectBackImage: this.data.noCollectImage
        })
      } else {
        this.setData({
          collectBackImage: this.data.hasCollectImage
        })
      }
      WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, this)
      this.getGoodsRelated()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: parseInt(options.id)
    })
    this.getGoodsInfo()
    // 获取购物车信息
    util.request(api.CartGoodsCount).then(res => {
      if (res.errno === 0) {
        this.setData({
          cartGoodsCount: res.data.cartTotal.goodsCount
        })
      }
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