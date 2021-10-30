<template>
  <div>
    <!-- 头部概览 -->
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="form" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              文章数
            </div>
            <count-to :start-val="0" :end-val="20" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              留言数
            </div>
            <count-to :start-val="0" :end-val="80" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-edit">
            <svg-icon icon-class="edit" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              分类数
            </div>
            <count-to :start-val="0" :end-val="30" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="list" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              标签数
            </div>
            <count-to :start-val="0" :end-val="30" :duration="3600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 头部概览 -->
    <!-- 关于我 -->
    <el-row :gutter="20" style="margin-left:30px">
      <el-col :span="6" :xs="24">
        <el-card style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span>关于我</span>
          </div>

          <div class="user-profile">
            <div class="box-center">
              <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
                <div>{{userInfo.nickName}}</div>
                {{ user.role }}
              </pan-thumb>
            </div>
            <div class="box-center">
              <div class="user-name text-center">{{userInfo.nickName}}</div>
              <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div>
            </div>
          </div>

          <div class="user-bio">
            <div class="user-education user-bio-section">
              <div class="user-bio-section-header">
                <svg-icon icon-class="peoples" /><span>个人简介</span>
              </div>
              <div class="user-bio-section-body">
                <div class="text-muted">
                  一位新时代农民工
                </div>
              </div>
            </div>
            <div class="user-skills user-bio-section">
              <div class="user-bio-section-header">
                <svg-icon icon-class="message" /><span>个人信息</span>
              </div>
              <span class="info" icon-class="message">{{`qq:${userInfo.qq}`}}</span>
              <span class="info ">github:<a>{{userInfo.github}}</a></span>
              <span class="info ">email:{{userInfo.email}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" style="margin-left:80px">
        <el-card>
          <div class="block">
            <el-timeline>
              <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
                <el-card>
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.content }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 关于我 -->
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import PanThumb from '@/components/PanThumb'
import Cookies from 'js-cookie'
export default {
  components: {
    CountTo,
    PanThumb
  },
  data () {
    return {
      timeline: [
        {
          timestamp: '2021/10/30',
          title: '发布文章',
          content: 'Redis的基本使用'
        },
        {
          timestamp: '2021/10/29',
          title: '发布文章',
          content: 'Mysql调优'
        },
      ],
      userInfo: {},
    }
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: 'http://1.117.152.124/img/avatar.png?imageView2/1/w/80/h/80',
          role: ''
        }
      }
    }
  },
  created () {
    let userInfo = Cookies.get("user");
    this.userInfo = JSON.parse(userInfo);
    console.log(this.userInfo);
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}
.aboutme {
  margin-left: 20px;
}
.text-muted {
  color: #777;
  font-size: 25px;
}
.info {
  font-size: 20px;
  display: block;
  margin-top: 20px;
}
.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-edit {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-edit {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>