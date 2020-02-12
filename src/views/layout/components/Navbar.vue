<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      @toggleClick="toggleSideBar"
      class="hamburger-container"
      id="hamburger-container"
    />
    <breadcrumb class="breadcrumb-container" id="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <screenfull class="right-menu-item hover-effect" id="screenfull" />
      </template>
      <template v-if="device!=='mobile'">
        <theme class="right-menu-item hover-effect" id="toggle-theme" />
      </template>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <div class="user-name right-menu-item">{{userInfo.username}}({{userInfo.userId}})</div>
          <img :src="avatar" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout" divided>
            <span style="display:block;">
              <coframe-icon name="power-off"></coframe-icon>注销
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {
  loginApi
} from '@/api'
import { mapGetters, mapMutations } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import Screenfull from '@/components/Screenfull'
import Theme from '@/components/Theme'

export default {
  components: {
    Hamburger,
    Breadcrumb,
    Screenfull,
    Theme
  },
  computed: {
    ...mapGetters({
      sidebar: 'coframe/app/sidebar',
      device: 'coframe/app/device',
      userInfo: 'coframe/user/userInfo'
    })
  },
  data () {
    return {
      avatar: require('@/assets/user.gif')
    }
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'coframe/user/setUserInfo'
    }),
    toggleSideBar () {
      this.$store.dispatch('coframe/app/toggleSideBar')
    },
    async logout () {
      loginApi.createLogout({}).then(response => {
        this.setUserInfo({})
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  user-select: none;
  .hamburger-container {
    line-height: 56px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
    i {
      margin-right: 10px;
      margin-bottom: 4px;
      height: 14px;
      width: 14px;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    .user-name {
      display: inline-block;
      width: 100px;
      height: 100%;
      font-weight: 600;
      font-size: 15px !important;
      color: #5a5e66;
      vertical-align: text-bottom;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        cursor: pointer;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
