//focus input
$('.modal').on('shown.bs.modal', function () {
    $(this).find('[autofocus]').focus();

});
var app = angular.module('MainApp', []);
app.controller("KhachHangController", function ($scope, $http) {
    function RestoreData() {
        $http({
            method: "GET",
            url: "/KH_API/api/KhachHangAPI/getChitieu",
        }).then(function (result) {
            var z = JSON.parse(result.data);
            console.log(z.Item2);
            var listCT = [];       
            for (j = 0; j < z.Item2.length; j++) {
                for (var i = 0; i < z.Item1.length; i++) {
                    if (z.Item1[i].Ma_Chi_Tieu_CT == z.Item2[j].Ma_Chi_Tieu) {
                        var ctkh = new ChiTieuKhachHangtmp(z.Item2[j].Ma_Chi_Tieu, z.Item2[j].Nam, z.Item2[j].Ten_Chi_Tieu, z.Item2[j].Ten_Chi_Tieu2, z.Item2[j].Status, z.Item1[i].Thang1,
                            z.Item1[i].Thang2, z.Item1[i].Thang3, z.Item1[i].Thang4, z.Item1[i].Thang5, z.Item1[i].Thang6,
                            z.Item1[i].Thang7, z.Item1[i].Thang8, z.Item1[i].Thang9, z.Item1[i].Thang10, z.Item1[i].Thang11,
                            z.Item1[i].Thang12
                        );
                        listCT.push(ctkh);
                    }
                }
            }
            var items = z.Item2.filter(function (x) {
                return !z.Item1.map(function (x) {
                    return x.Ma_Chi_Tieu_CT;
                }).includes(x.Ma_Chi_Tieu);

            });


            if (items) {
                for (var p = 0; p < items.length;p++) {
                    var ctkh2 = new ChiTieuKhachHangtmp(items[p].Ma_Chi_Tieu, items[p].Nam, items[p].Ten_Chi_Tieu, items[p].Status,0,0,0,0,0,0,0,0,0,0,0,0);
                    listCT.push(ctkh2);
                }
            }
            $scope.arr_temp = listCT;
            $scope.datacount = $scope.arr_temp.length;

        })

    }
    $scope.Trang_Thai_add = "Sử dụng";
    RestoreData();

    $scope.funcReload = function () {
        RestoreData();
    }

// click button them moi
    $scope.ThemMoi = function () {
        document.getElementById("luuvathembtn").style.display = "inline-block";
        $scope.arr_temp_CT = "";
        reset();
        $scope.Trang_Thai_add = "Sử dụng";
        ListCTCTT = [];

    }



    $scope.LuuVaThem = function () {
        var chitieukhachhang = new ChiTieuKhachHangMain(
            $scope.Nam_add, $scope.Ten_Chi_Tieu_add, $scope.Ten_Chi_Tieu2_add, $scope.Trang_Thai_add, $scope.Ma_Chi_Tieu_add
        );
        $http({
            method: 'POST',
            url: '/KH_API/api/KhachHangAPI/ThemMoiChiTieu',
            data: chitieukhachhang
        }).then(function (res) {

        });
   
        $http({
            method: 'POST',
            url: '/KH_API/api/KhachHangAPI/ThemMoiChiTieuCT',
            data: JSON.stringify($scope.arr_temp_CT)
        }).then(function (res) {

            RestoreData();

        });

        alert("Them thanh cong !!");
        ListCTCTT = [];


    };

        /// them moi ban ghi
    var ListCTCTT = [];
    $scope.LuuVaThemNhanVien = function () {
        if ($scope.FormNhanVien.$invalid) {
            return false;
            $("#myModal2").modal("show");
        }
        else {
            var chitieukhachhangct = new ChiTieuKhachHangCTMain(
                $scope.Ma_NV_add, "", $scope.thang1_add, $scope.thang1_add, $scope.thang1_add,
                $scope.thang2_add, $scope.thang3_add, $scope.thang4_add, $scope.thang5_add,
                $scope.thang6_add, $scope.thang7_add, $scope.thang8_add, $scope.thang9_add,
                $scope.thang10_add, $scope.thang11_add, $scope.thang12_add
            );
            ListCTCTT.push(chitieukhachhangct);
            $scope.arr_temp_CT = ListCTCTT;
      
            $("#myModal2").modal("hide");
        }
        ResetNhanVien();

    }


    //reset 
    //Sua ban ghi
    function GetRowEdit(e) {
        var ListCTCT = [];
        for (var i = 0; i < $scope.arr_temp.length; i++) {
            if ($scope.arr_temp[i].Ma_Chi_Tieu == e) {
                $scope.Nam_add = $scope.arr_temp[i].Nam;
                $scope.Ten_Chi_Tieu_add = $scope.arr_temp[i].Ten_Chi_Tieu;
                $scope.Trang_Thai_add = $scope.arr_temp[i].Trang_Thai;

            }
        }

        $http({
            method: "GET",
            url: "/KH_API/api/KhachHangAPI/getChitieu2",
        }).then(function (result) {
            var z = JSON.parse(result.data);

            for (var i = 0; i < z.Item1.length; i++) {
                if (z.Item1[i].Ma_Chi_Tieu_CT == e) {
                    var ctkhct = new ChiTieuKhachHangCT(z.Item1[i].Ma_Chi_Tieu_CT, z.Item1[i].Ma_NV, z.Item1[i].Ma_Chi_Tieu_CT, z.Item1[i].Thang1,
                        z.Item1[i].Thang2, z.Item1[i].Thang3, z.Item1[i].Thang4, z.Item1[i].Thang5, z.Item1[i].Thang6,
                        z.Item1[i].Thang7, z.Item1[i].Thang8, z.Item1[i].Thang9, z.Item1[i].Thang10, z.Item1[i].Thang11,
                        z.Item1[i].Thang12
                    );
                    ListCTCT.push(ctkhct);
                }
            }

            $scope.arr_temp_CT = ListCTCT;

        });
    }

    var ListCTCT2 = [];
    function RestoreDataNhanVien(e) {
        $http({
            method: "GET",
            url: "/KH_API/api/KhachHangAPI/getChitieu2",
        }).then(function (result) {
            var z = JSON.parse(result.data);
            for (var i = 0; i < z.Item1.length; i++) {
                if (z.Item1[i].Ma_Chi_Tieu_CT == e) {
                    var ctkhct = new ChiTieuKhachHangCT(z.Item1[i].Ma_Chi_Tieu_CT, z.Item1[i].Ma_NV, z.Item1[i].Ma_Chi_Tieu_CT, z.Item1[i].Thang1,
                        z.Item1[i].Thang2, z.Item1[i].Thang3, z.Item1[i].Thang4, z.Item1[i].Thang5, z.Item1[i].Thang6,
                        z.Item1[i].Thang7, z.Item1[i].Thang8, z.Item1[i].Thang9, z.Item1[i].Thang10, z.Item1[i].Thang11,
                        z.Item1[i].Thang12
                    );
                    ListCTCT2.push(ctkhct);
                }
            }

            $scope.arr_temp_CT = ListCTCT2;
          

        });

    }
    // edit bang double click
    $scope.FunctionEdit = function (e) {
        GetRowEdit(e);
        $('#myModal').modal("show");
        document.getElementById("luuvathembtn").style.display = "none";
        console.log(e);
        $scope.Save = function () {
            var p = new ChiTieuKhachHangMain($scope.Nam_add, $scope.Ten_Chi_Tieu_add, $scope.Trang_Thai_add, e)
            console.log(p);
            $http({
                method: "POST",
                url: '/KH_API/api/KhachHangAPI/UpdateChiTieu',
                data: p
            }).then(function (data) {

                console.log(data);
            })
            RestoreData();
           
        }
    }
    // update nhan vien
    $scope.UpdateNhanVien = function (e) {
        $http({
            method: "POST",
            url: '/KH_API/api/KhachHangAPI/UpdateNhanVien',
            data: JSON.stringify($scope.arr_temp_CT),
        }).then(function (data) {

            console.log(data);
        })

    }




    //*************
    //  xoa ban ghi

    // xoa bang chon
        var listDelete = [];
        $scope.delete = function () {
            var dem = [];
            for (var i = 0; i < $scope.arr_temp.length; i++) {
                if ($scope.arr_temp[i].selected) {
                    dem.push(i);
                    listDelete.push($scope.arr_temp[i].Ma_Chi_Tieu);
                }
            }
      
            if (confirm("Bạn có muốn xóa " + dem.length + " bản ghi ?")) {

                $http({
                    method: "POST",
                    url: '/KH_API/api/KhachHangAPI/DeleteTieuChi',
                    data: listDelete
                }).then(function (data) {

                    RestoreData();
                });         
            }
    }
    //xoa bang icon 
    var listDelete2 = [];
    $scope.DeleteOneRow = function (e) {
     
        if (e != undefined&&e!="") {
            for (var i = 0; i < $scope.arr_temp.length; i++) {
                if ($scope.arr_temp[i].Ma_Chi_Tieu == e) {

                    listDelete2.push($scope.arr_temp[i].Ma_Chi_Tieu);
                }
            }

            if (confirm("Bạn có muốn xóa 1 bản ghi ?")) {
                $http({
                    method: "POST",
                    url: '/KH_API/api/KhachHangAPI/DeleteTieuChi',
                    data: listDelete2
                }).then(function (data) {

                    RestoreData();
                });
            }
        }
    
    }

    // Xoa item nhan vien

    $scope.deleteItemNV = function (e, p) {
        
        if (confirm("Bạn có muốn xóa 1 bản ghi ?")) {
            $http({
                method: "POST",
                url: '/KH_API/api/KhachHangAPI/DeleteItemNhanVien',
                params: { strMa:e,strMaChiTieu:p }
            }).then(function (data) {
                
                for (var i = 0; i < $scope.arr_temp_CT.length; i++) {
                    if ($scope.arr_temp_CT[i].Ma_Chi_Tieu_CT == p && $scope.arr_temp_CT[i].Ma_NV==e) {
                        $scope.arr_temp_CT= $scope.arr_temp_CT.splice(i, 1);
                    }
                }
             
                RestoreData();
            });
        }
    }




    //Tim kiem
    $scope.funcSearch = function (e) {
        if (e != undefined) {
            $http({
                method: 'GET',
                url: '/KH_API/api/KhachHangAPI/SearchChiTieu',
                params: {
                    str: e
                }
            }).then(function (res) {

                var z = JSON.parse(res.data);
             
                var listCT = [];

              
                for (var i = 0; i < z.Item1.length; i++) {
                    for (var j = 0; j < z.Item2.length; j++) {
                        if (z.Item1[i].Ma_Chi_Tieu_CT == z.Item2[j].Ma_Chi_Tieu) {
                   
                            var ctkh = new ChiTieuKhachHangtmp(z.Item1[i].Ma_Chi_Tieu_CT, z.Item2[j].Nam, z.Item2[j].Ten_Chi_Tieu, z.Item2[j].Status, z.Item1[i].Thang1,
                                z.Item1[i].Thang2, z.Item1[i].Thang3, z.Item1[i].Thang4, z.Item1[i].Thang5, z.Item1[i].Thang6,
                                z.Item1[i].Thang7, z.Item1[i].Thang8, z.Item1[i].Thang9, z.Item1[i].Thang10, z.Item1[i].Thang11,
                                z.Item1[i].Thang12
                            );
                            listCT.push(ctkh);
                        }
                    }
                }
                $scope.arr_temp = listCT;
                listCT = [];
            })

        }
   
    };
   
    //Sap xep ban ghi
    $scope.reverse = false;
    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;

    }

    //reset
    function Reset() {
        $scope.MaKH_add = "";
        $scope.DiaChi_add = "";
        $scope.MaSoThue_add = "";
        $scope.TenKH_add = "";
        $scope.DienThoai_add = "";

    }
    function ResetNhanVien() {
        $scope.Ma_NV_add = "";
        $scope.thang1_add = "";
        $scope.thang2_add = "";
        $scope.thang3_add = "";
        $scope.thang4_add = "";
        $scope.thang5_add = "";
        $scope.thang6_add = "";
        $scope.thang7_add = "";
        $scope.thang8_add = "";
        $scope.thang9_add = "";
        $scope.thang10_add = "";
        $scope.thang11_add = "";
        $scope.thang12_add = "";
    }

    // checkbox
    $scope.toggleAll = function () {
        var toggleStatus = $scope.isAllSelected;
        angular.forEach($scope.arr_temp, function (itm) {
            itm.selected = toggleStatus;
        });

    }
    $scope.optionToggled = function () {
        $scope.isAllSelected = $scope.arr_temp.every(function (itm) { return itm.selected; }

        )
    }

    function ChiTieuKhachHangMain(Nam, Ten_Chi_Tieu,Ten_Chi_Tieu2, Trang_Thai, Ma_Chi_Tieu) {
        this.Nam = Nam;
        this.Ten_Chi_Tieu = Ten_Chi_Tieu;
        this.Ten_Chi_Tieu2 = Ten_Chi_Tieu2;
        this.Status = Trang_Thai;
        this.Ma_Chi_Tieu = Ma_Chi_Tieu;
    }
    function ChiTieuKhachHangCTMain(Ma_NV, Ma_Chi_Tieu_CT, Thang1, Thang2, Thang3, Thang4, Thang5, Thang6, Thang7, Thang8, Thang9, Thang10, Thang11, Thang12) {
        this.Ma_Chi_Tieu_CT = Ma_Chi_Tieu_CT;
        this.Ma_NV = Ma_NV;
        this.Thang1 = Thang1;
        this.Thang2 = Thang2;
        this.Thang3 = Thang3;
        this.Thang4 = Thang4;
        this.Thang5 = Thang5;
        this.Thang6 = Thang6;
        this.Thang7 = Thang7;
        this.Thang8 = Thang8;
        this.Thang9 = Thang9;
        this.Thang10 = Thang10;
        this.Thang11 = Thang11;
        this.Thang12 = Thang12;

    }
    //tao 1 object de luu
    function ChiTieuKhachHangtmp(Ma_Chi_Tieu, Nam, Ten_Chi_Tieu,Ten_Chi_Tieu2, Trang_Thai, Thang1, Thang2, Thang3, Thang4, Thang5, Thang6, Thang7, Thang8, Thang9, Thang10, Thang11, Thang12) {
        this.Ma_Chi_Tieu = Ma_Chi_Tieu;
        this.Nam = Nam;
        this.Ten_Chi_Tieu = Ten_Chi_Tieu;
        this.Ten_Chi_Tieu2 = Ten_Chi_Tieu2;
        this.Trang_Thai = Trang_Thai;
        this.Thang1 = Thang1;
        this.Thang2 = Thang2;
        this.Thang3 = Thang3;
        this.Thang4 = Thang4;
        this.Thang5 = Thang5;
        this.Thang6 = Thang6;
        this.Thang7 = Thang7;
        this.Thang8 = Thang8;
        this.Thang9 = Thang9;
        this.Thang10 = Thang10;
        this.Thang11 = Thang11;
        this.Thang12 = Thang12;
    }
    function ChiTieuKhachHangCT(Ma_Chi_Tieu_CT, Ma_NV, Ten_Chi_Tieu, Thang1, Thang2, Thang3, Thang4, Thang5, Thang6, Thang7, Thang8, Thang9, Thang10, Thang11, Thang12) {
        this.Ma_Chi_Tieu_CT = Ma_Chi_Tieu_CT;
        this.Ma_NV = Ma_NV;
        this.Ten_Chi_Tieu = Ten_Chi_Tieu;
        this.Thang1 = Thang1;
        this.Thang2 = Thang2;
        this.Thang3 = Thang3;
        this.Thang4 = Thang4;
        this.Thang5 = Thang5;
        this.Thang6 = Thang6;
        this.Thang7 = Thang7;
        this.Thang8 = Thang8;
        this.Thang9 = Thang9;
        this.Thang10 = Thang10;
        this.Thang11 = Thang11;
        this.Thang12 = Thang12;
    }

    // end funtion object
    //Reset cac dong ve mac dinh
    function reset() {
        $scope.Nam_add = "";
        $scope.Ten_Chi_Tieu_add = "";
        $scope.Trang_Thai_add = "";

    }


});

