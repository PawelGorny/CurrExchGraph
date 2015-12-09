var waitImage='./img/wait.png';
function loadValues(){
    try{
        var obj=localStorage.getItem('cur1');
        if (obj!=null){
            document.getElementById('c1').value=obj;
        }
        obj=localStorage.getItem('c1o');
        if (obj!=null){
            document.getElementById('c1o').value=obj;
            change('c1');
        }
        obj=localStorage.getItem('cur2');
        if (obj!=null){
            document.getElementById('c2').value=obj;
        }
        obj=localStorage.getItem('c2o');
        if (obj!=null){
            document.getElementById('c2o').value=obj;
            change('c2');
        }
        obj=localStorage.getItem('period');
        if (obj!=null){
            document.getElementById('period').value=obj;
        }
    }
    catch(e){}
}
function showGraphs(){
    $('body').addClass('ui-loading');
    var image=document.getElementById('graph');
    var url='http://chart.finance.yahoo.com/';
    var period=$('#period').val();
    var countO=0;
    var cur1=document.getElementById('c1').value;
    if (cur1=='o'){
        cur1=document.getElementById('c1o').value;
        countO++;
    }
    if (cur1==''|| cur1.length!=3)
    {
        alert('Please specify the 1st currency');
        return false;
    }
    try{
        localStorage.setItem('cur1',document.getElementById('c1').value);
        if (document.getElementById('c1').value=='o'){
            localStorage.setItem('c1o',document.getElementById('c1o').value);
        }
    }catch(e){}
    var cur2=document.getElementById('c2').value;
    if (cur2=='o'){
        cur2=document.getElementById('c2o').value;
        countO++;
    }
    if (cur2==''|| cur2.length!=3)
    {
        alert('Please specify the 2st currency');
        return false;
    }
    try{
        localStorage.setItem('cur2',document.getElementById('c2').value);
        if (document.getElementById('c2').value=='o'){
            localStorage.setItem('c2o',document.getElementById('c2o').value);
        }
    }catch(e){}
    try{
        localStorage.setItem('period',period);
    }catch(e){}
    if (period=='1d')
    {
        url+='b?s=';
        url+=cur1.toUpperCase()+cur2.toUpperCase()+'%3dX';
    }else
    if (period=='5d')
    {
        url+='w?s=';
        url+=cur1.toUpperCase()+cur2.toUpperCase()+'%3dX';
    }else
    {
        url+=period+'?';
        url+=cur1.toUpperCase()+cur2.toUpperCase()+'=x';
    }
    getRate(cur1, cur2);
    image.src=waitImage;
    image.style.display='block';
    image.src=url;
    $('body').removeClass('ui-loading');
    $('#fakeSpace').height(0);
    if (countO==2)
        $('#fakeSpace').height(180);
    else if (countO==1)
        $('#fakeSpace').height(110);
    return true;
}//show

function change(obj){
    var cur=document.getElementById(obj).value;
    var objo=document.getElementById(obj+'o');
    if (cur=='o'){
        objo.style.display='inline';
    }else
    {
        objo.style.display='none';
    }
}
function getRate(from, to) {
    var script = document.createElement('script');
    script.setAttribute('src', "http://query.yahooapis.com/v1/public/yql?q=select%20rate%2Cname%20from%20csv%20where%20url%3D'http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes%3Fs%3D"+from+to+"%253DX%26f%3Dl1n'%20and%20columns%3D'rate%2Cname'&format=json&callback=parseExchangeRate");
    document.body.appendChild(script);
}

function parseExchangeRate(data) {
    var rate = parseFloat(data.query.results.row.rate, 10);
    //$('#spanrate').html('Current value: '+rate);
    $('#spanrate').html(rate);
}