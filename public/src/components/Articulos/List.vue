<template>
    <div>
        <div style="border: 1px solid #ebebeb; padding: 20px; margin-bottom: 20px">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">Tablero</el-breadcrumb-item>
                <el-breadcrumb-item>Listado de Articulos</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table
      :data="articulos"
      style="width: 100%"
      height="500"
      highlight-current-row
      @current-change="handleSelectRow">
      <el-table-column
        prop="codigo"
        label="Codigo">
      </el-table-column>
      <el-table-column
        prop="descripcion"
        label="Descripcion">
      </el-table-column>
      <el-table-column
        prop="iva_tipo"
        label="IVA">
      </el-table-column>
    </el-table>
    <div class="block">
        <el-pagination
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
            :page-size="25"
            :total="total">
        </el-pagination>
    </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            articulos: [],
            total: 0
        }
    },
    mounted: function () {
        this.getArticulos()
    },
    methods: {
        handleCurrentChange: function (val) {
            this.getArticulos(val)
        },
        handleSelectRow: function (val) {
            this.$message(val.descripcion)
        },
        getArticulos: function (pagina = 1) {
            this.$http.get('http://nsstock.dev/api/articulo/?page=' + pagina).then(function (result) {
                this.articulos = result.data.data
                this.total = result.data.total
            })
        }
    }
}
</script>
