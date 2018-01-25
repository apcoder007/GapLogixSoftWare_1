materialAdmin.factory('commonservice', function (){
    var data = '';
    return{
        setData: function(selectedList){
            data = selectedList;
        },
        getData: function(){
            return data;
        }
    }
});