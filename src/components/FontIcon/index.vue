/*
 * @Author: dongwenjie 
 * @Date: 2020-02-17 01:08:54
 * @Description 字体图标组件 
 * @Last Modified by: dongwenjie
 * @Last Modified time: 2020-02-17 01:09:20
 */

<template>
  <i :class="`fa-${name}`" aria-hidden="true" class="fa"></i>
</template>

<script>
import './font-awesome-4.7.0/css/font-awesome.min.css'
export default {
  name: 'coframe-icon',
  props: {
    name: {
      type: String,
      required: false,
      default: 'font-awesome'
    }
  }
}
</script>
