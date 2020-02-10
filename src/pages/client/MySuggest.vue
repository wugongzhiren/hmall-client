<template>
  <div>
    <div style="margin: 15px">


      <el-row><span style="margin-top: 15px">你的建议与意见：</span></el-row>
      <el-row style="margin-top: 15px">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入反馈内容"
          v-model="textarea">
        </el-input>
      </el-row>
    </div>
    <div style="align-content: center">
      <el-button type="primary" @click="saveChange">提交</el-button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import {saveSuggest} from '../../api/client';
  import Popup from '../../components/Popup';

  export default {
    name: 'MySuggest',
    components: {
      Popup
    },
    computed: {
      ...mapState([
        'clientToken'
      ]),
    },
    data() {
      return {
        textarea: '',

      }
    },

    methods: {
      ...mapMutations({
        setClientName: 'SET_CLIENT_NAME',
      }),
      saveChange() {
        if(this.clientToken==null){
          alert('请先登录');
          return;
        }
        if (this.textarea == '') {
          alert('请填写内容');
          return;
        }

        const res = saveSuggest({'userid': this.clientToken, 'content': this.textarea});
        res
          .then((data) => {
            alert('反馈成功');
          })
          .catch((e) => {
            alert(e)
          })
      },

    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/var.less";

</style>
