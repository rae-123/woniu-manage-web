<template>
  <v-form v-model="valid" ref="brandForm">
    <v-text-field
      label="类型名称"
      v-model="type.typeName"
      :rules="[v => !!v || '类型名称不能为空']"
      :counter="10"
      required
    />
    {{type.typeName}}
    <v-text-field
      label="首字母"
      v-model="type.firstLetter"
      :rules="[v => v.length === 1 || '首字母只能是1位']"
      required
      mask="A"
    />
    <v-text-field
      label="描述信息"
      v-model="type.typeDescription"
      :rules="[v => !!v || '描述信息不能为空']"
      :counter="10"
      required
    />
    <!--<v-cascader url="/item/category/list" required
                v-model="brand.categories"
                multiple label="商品分类"/>-->
   <!-- <v-layout row>
      <v-flex xs3>
        <span style="font-size: 16px; color: #444">品牌LOGO：</span>
      </v-flex>
      <v-flex>
        <v-upload
          v-model="brand.image" url="/item/upload" :multiple="false" :pic-width="250" :pic-height="90"
        />
      </v-flex>
    </v-layout>-->
    <v-layout class="my-4">
      <v-btn @click="submit" color="primary">提交</v-btn>
      <v-btn @click="clear" color="warning">重置</v-btn>
    </v-layout>
  </v-form>
</template>

<script>
  import config from '@/config';
  export default {
    name: "brand-form",
    props: {
      oldBrand: Object,
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
        type: {
          typeName: "",
          firstLetter: "",
          typeDescription: ""
        },
        imageDialogVisible:false
      }
    },
    watch: {
      oldBrand:{
        deep:true,
        handler(val){
          Object.deepCopy(val,this.type);
        }
      }
    },
    methods: {
      submit() {
        // 表单校验
        if (this.$refs.brandForm.validate()) {
          this.type.firstLetter = this.type.firstLetter.toUpperCase();
          // 将数据提交到后台
          this.$http({
            method: 'post',
            url: '/item/type/add',
            data:{
              typeName:this.type.typeName,
              firstLetter: this.type.firstLetter,
              typeDescription: this.type.typeDescription
            }
            //data: this.$qs.stringify(this.type)
          }).then(() => {
            // 关闭窗口
            this.$message.success("保存成功！");
            this.closeWindow();
          }).catch(() => {
            this.$message.error("保存失败！");
          });
        }
      },
      clear() {
        // 重置表单
        this.$refs.brandForm.reset();
        this.type = [];
      },
     /* // 图片上传出成功后操作
      handleImageSuccess(res) {
        this.brand.image = res;
      },
      removeImage(){
        this.brand.image = "";
      },*/
      closeWindow(){
        this.$emit("close");
      }
    },
    mounted(){
      if(this.isEdit){
    this.type=Object.deepCopy(this.oldBrand);
    }
  }
  }
</script>

<style scoped>

</style>
