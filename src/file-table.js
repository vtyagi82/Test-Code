var order = true;
var fileTblData = [
		  { "Name": "zips", "Type": "directory", "DateModified":"5/10/2018 17:39:27", "Size":"6 kb" },
		  { "Name": "presets", "Type": "directory", "DateModified":"5/30/2018 17:22:50", "Size":"12 kb" },
		  { "Name": "workflow", "Type": "file", "DateModified":"6/11/2018 17:23:11", "Size":"9 kb" },
		  { "Name": "software", "Type": "directory", "DateModified":"5/10/2018 14:35:26", "Size":"11 kb" },
		  { "Name": "nmm_data", "Type": "directory", "DateModified":"6/14/2018 15:37:08", "Size":"6 kb" },
		  { "Name": "jobs", "Type": "directory", "DateModified":"6/15/2018 13:43:27", "Size":"18 kb" }
		];

function createTable(noOfContacts){
// CREATE DYNAMIC TABLE.
			var table = document.createElement("table");
			table.style.width = '50%';
			table.setAttribute('border', '1');
			table.setAttribute('cellspacing', '0');
			table.setAttribute('cellpadding', '5');
			
			// column header
			var col = []; // define an empty array
			for (var i = 0; i < noOfContacts; i++) {
				for (var key in fileTblData[i]) {
					if (col.indexOf(key) === -1) {
						col.push(key);
					}
				}
			}
			
			// CREATE TABLE HEAD .
			var tHead = document.createElement("thead");	
				
			
			// CREATE ROW FOR TABLE HEAD .
			var hRow = document.createElement("tr");
			
			// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
			for (var i = 0; i < col.length; i++) {
					var th = document.createElement("th");
					th.innerHTML = col[i];
					hRow.appendChild(th).setAttribute("className", "sortCol");
			}
			
			

			
			
			
			tHead.appendChild(hRow);
			table.appendChild(tHead);
			
			// CREATE TABLE BODY .
			var tBody = document.createElement("tbody");	
			
			// ADD COLUMN HEADER TO ROW OF TABLE HEAD.
			for (var i = 0; i < noOfContacts; i++) {
			
					var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .
					
					
					for (var j = 0; j < col.length; j++) {
						var td = document.createElement("td");
						td.innerHTML = fileTblData[i][col[j]];
						bRow.appendChild(td);
					}
					tBody.appendChild(bRow)

			}
			table.appendChild(tBody);	
			
			
			// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
			var divContainer = document.getElementById("fileTblData");
			divContainer.innerHTML = "";
			divContainer.appendChild(table);
}
function generateDynamicTable(){
	
		var noOfContacts = fileTblData.length;
		
		if(noOfContacts>0){
			createTable(noOfContacts);
			
			
		}	
		
		var anchors = document.getElementsByClassName('sortCol');
			
			for(var i = 0; i < anchors.length; i++) {
								
				var anchor = anchors[i];
				anchor.onclick = function(e) {
				
					if (order === true){
						order = false;
					if(e.target.innerText == "Name"){
					//fileTblData.sort();					
					fileTblData.sort(function(a, b) {
						  var x = a.Name.toLowerCase();
						  var y = b.Name.toLowerCase();
						  return x < y ? -1 : x > y ? 1 : 0;
					  });					  
					}else if(e.target.innerText == "Type"){					
					fileTblData.sort(function(a, b) {
						  var x = a.Type.toLowerCase();
						  var y = b.Type.toLowerCase();
						  return x < y ? -1 : x > y ? 1 : 0;
					  });					  
					}else if(e.target.innerText == "DateModified"){					
					fileTblData.sort(function(a, b) {
						  var x = a.DateModified.toLowerCase();
						  var y = b.DateModified.toLowerCase();
						  return x < y ? -1 : x > y ? 1 : 0;
					  });					  
					}else if(e.target.innerText == "Size"){				
					fileTblData.sort(function(a, b){return b - a});
					  
					}
					
					}else{
						order = true;
						if(e.target.innerText == "Name"){
					//fileTblData.sort();					
					fileTblData.sort(function(a, b) {
						  var x = a.Name.toLowerCase();
						  var y = b.Name.toLowerCase();
						  return x > y ? -1 : x < y ? 1 : 0;
					  });					  
					}else if(e.target.innerText == "Type"){					
					fileTblData.sort(function(a, b) {
						  var x = a.Type.toLowerCase();
						  var y = b.Type.toLowerCase();
						  return x > y ? -1 : x < y ? 1 : 0;
					  });					  
					}else if(e.target.innerText == "DateModified"){					
					fileTblData.sort(function(a, b) {
						  var x = a.DateModified.toLowerCase();
						  var y = b.DateModified.toLowerCase();
						  return x > y ? -1 : x < y ? 1 : 0;
					  });					  
					}else if(e.target.innerText == "Size"){				
					fileTblData.sort(function(a, b) {
						  var x = a.Size.toLowerCase();
						  var y = b.Size.toLowerCase();
						  return x > y ? -1 : x < y ? 1 : 0;
					  });
					  
					}
					
					}
					generateDynamicTable();					
				}
			}
		}