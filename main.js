function MainCtrl($scope, $filter) {
  
  var vm = this;
  
  vm.PName = 'T-Shirt';
  vm.Qty   = 5;
  vm.Price = 1000;
 
  vm.subtotal = function(Qty, Price) {
    var subtotal = Qty * Price;
    if(Qty >= 10) {
      subtotal = subtotal * 0.9;
    }
    return subtotal;
  };
  
  vm.carts = [];
  vm.carts.push({
    PName: 'T-Shirt',
    Price: 199,
    Qty: 3
  });
  vm.carts.push({
    PName: 'Shoes',
    Price: 1800,
    Qty: 2
  });
  vm.carts.push({
    PName: 'Eye glasses',
    Price: 1000,
    Qty: 5
  });

  vm.add = function(){
    vm.carts.push({
      PName: vm.PName,
      Price: vm.Price,
      Qty:   vm.Qty
    });
  };
  
  vm.IsDebug = false;
 
  vm.sum = function() {
    var total = 0;
    angular.forEach(vm.carts, function(item) {
      total += vm.subtotal(item.Qty, item.Price);
    });
    return total;
  };
  
  vm.del = function(item) {
    var idx = vm.carts.indexOf(item);
    vm.carts.splice(idx, 1);
  };
  
  vm.addQty = function(item, num) {
    item.Qty = item.Qty + num;
    
    if(item.Qty > 10) {
      item.Qty = item.Qty - num;
    }
    
    if(item.Qty <= 0) {
      if(confirm('你確定要刪除這筆數量為0的資料嗎？')) {
        var idx = vm.carts.indexOf(item);
        vm.carts.splice(idx, 1);
      } else {
        item.Qty = item.Qty - num;
      }
    }
  };
  
  vm.batchDelete = function() {
    var newarray = [];
    
    angular.forEach(vm.carts, function(item) {
      if(!item.IsDelete) {
        newarray.push(item);
      }
    });
    
    vm.carts = newarray;
  };
  
  vm.CheckAll = function() {
    
    angular.forEach(vm.carts, function(item) {
      item.IsDelete = vm.IsCheckAll;
    });
    
  };
  
  vm.cartsOrderBy = 'Price';
}
