<script type="text/javascript">
           function myFunction() {
  

                    var ID = document.getElementById("ID").value;
                    var name = document.getElementById("name").value;
                    var cname = document.getElementById("cname").value;
                    var CID = document.getElementById("CID").value;
                    var MS = document.getElementById("MS").value;
                    var ME = document.getElementById("ME").value;
                    var TS = document.getElementById("TS").value;
                    var TE = document.getElementById("TE").value;
                    var WS = document.getElementById("WS").value;
                    var WE = document.getElementById("WE").value;
                    var THS = document.getElementById("THS").value;
                    var THE = document.getElementById("THE").value;
                    var FS = document.getElementById("FS").value;
                    var FE = document.getElementById("FE").value;
                    var ML = document.getElementById("ML").value;
                    var TL = document.getElementById("TL").value;
                    var WL = document.getElementById("WL").value;
                    var THL = document.getElementById("THL").value;
                    var FL = document.getElementById("FL").value;
                    var dataString = 'ID1=' + ID + '&name1=' ;name + '&cname1=' ;cname + '&CID1=' ;CID + '&MS1=' + MS + '&ME1=' + ME + '&TS1=' + TS + '&TE1=' + TE + '&WS1=' + WS + '&WE1=' + WE + '&THS1=' + THS + '&THE1=' + THE + '&FS1=' + FS + '&FE1=' + FE + '&ML1=' + ML + '&TL1=' + TL + '&WL1=' + WL + '&THL1=' + THL + '&FL1=' + FL;
                    if (ID == '' || name == '' || cname == '' || CID == ''|| MS == '' || ME == '' || TS == ''  || TE == '' || WS == ''  || WE == '' || THS == ''  || THE == '' || FS == '' || FE == '' || ML == '' || TL == ''  || WL == '' || THL == '' || FL == '') {
                        alert("Please Fill All Fields");
                    } else {
                        $.ajax({
                          type: "POST",
                          url: 'folder/ajaxjs.php',
                          data: dataString,
                          cache: false,
                          success: function(html) {
                            alert(html);
                          }
                          });
                        }
                  return false;
                }
              </script>
	}