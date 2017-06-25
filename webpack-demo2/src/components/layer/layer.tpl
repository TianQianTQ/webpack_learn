<div class="layer">
    <img src='../src/assets/bg.jpg'/>
    <img src="${require('../../assets/bg.jpg')}">
	<div> this is <%= name %> layer!</div>
	<% for(var i=0;i<arr.length;i++){%>
    <%= arr[i]%>
	<% } %>
</div>