<template>
  <v-form v-model="valid" ref="goodsForm">
    <v-text-field
      label="图书名称"
      v-model="product.name"
      :rules="[v => !!v || '图书名称不能为空']"
      :counter="10"
      required
    />
    <v-text-field
      label="作者"
      v-model="product.author"
      :rules="[v => !!v || '作者不能为空']"
      :counter="10"
      required
    />

    <v-text-field
      label="出版社"
      v-model="product.publisher"
      :rules="[v => !!v || '出版社不能为空']"
      :counter="10"
      required
    />

    <v-text-field
      label="价格"
      v-model="product.price"
      :rules="[v => !!v || '价格不能为空']"
      :counter="10"
      required
    />

    <v-select label="所属类型" v-model="product.typeid" :items="typeOptions" dense autocomplete
              item-text="typeName" item-value="typeid" :rules="[v => !!v || '类型不能为空']" required/>


    <v-layout row>
      <v-flex xs3>
        <span style="font-size: 16px; color: #444">封页：</span>
      </v-flex>
      <v-flex>
        <v-upload
          v-model="product.imgurl"   url="/upload/upFile/uploadImg" :multiple="false" :pic-width="250" :pic-height="90"
        />
      </v-flex>
    </v-layout>
    <v-layout class="my-4">
      <v-btn @click="submit" color="primary">提交</v-btn>
      <v-btn @click="clear" color="warning">重置</v-btn>
    </v-layout>

   {{product.imgurl}}
  </v-form>
</template>

<script>
  import config from '@/config';
  export default {
    name: "goods-form",
    props: {
      oldGoods: Object,
      isEdit: {
        type: Boolean,
        default: false
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        baseUrl: config.api,
        valid:false,
        product: {
          productid:"",
          name: "",
          author: "",
          publisher: "",
          price: "",
          typeid:"",
          imgurl:"",
        },
        imageDialogVisible:false ,
        typeOptions:[
          {"typeid":1,"typeName":"少儿读物"},
          {"typeid":2,"typeName":"武侠小说"},
          {"typeid":3,"typeName":"都市言情"}
        ]
      }
    },
    watch: {
      oldGoods:{
        deep:true,
        handler(val){
          Object.deepCopy(val,this.product);
        }
      }
    },
    methods: {
      submit() {
        // 表单校验
        if (this.$refs.goodsForm.validate()) {
          if(!this.isEdit){ //添加
            // 将数据提交到后台
            this.$http({
              method:'post',
              url: '/item/product/add',
              data: this.product
            }).then(() => {
              // 关闭窗口
              this.$message.success("保存成功！");
              this.closeWindow();
            }).catch(() => {
              this.$message.error("保存失败！");
            });
          }else{//修改
            alert(this.product.productid);
            // 将数据提交到后台
            this.$http({
              method:'put',
              url: '/item/product/update',
              data: this.product
            }).then(() => {
              // 关闭窗口
              this.$message.success("修改成功！");
              this.closeWindow();
            }).catch(() => {
              this.$message.error("修改失败！");
            });
          }
        }
      },
      clear() {
        // 重置表单
        this.$refs.brandForm.reset();
      },
      // 图片上传出成功后操作
      handleImageSuccess(res) {
        alert(res);
        this.product.imgurl = res;
      },
      removeImage(){
        this.product.imgurl = "";
      },
      closeWindow(){
        this.$emit("close");
      }
    },
    mounted() {
      if(this.isEdit){
        this.product=this.oldGoods;
      }
    }
  }
</script>

<style scoped>

</style>
