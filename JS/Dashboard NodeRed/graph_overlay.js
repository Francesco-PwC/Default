//SWITCH SIMULATION NODERED
var MESSAGGIO_NODERED_Punto_notify = false;
var MESSAGGIO_NODERED_Punto_min_thres = false;
var MESSAGGIO_NODERED_Punto_max_thres = true;


function getPointOnclick(chart_canvas, chart, ref_overlay){
    chart_canvas.onclick = function(evt){
      //RANDOM TEST NUMBERS
      var NUMERO_CASUALE_A = Math.ceil(Math.random()*100);
      var NUMERO_CASUALE_B = Math.floor(Math.random()*100);
      var NUMERO_CASUALE_C = Math.floor(Math.random()*100);
      
      var activePoints = chart.getElementAtEvent(event);

      // make sure click was on an actual point
      if (activePoints.length > 0) {
        var clickedDatasetIndex = activePoints[0]._datasetIndex;
        var clickedElementindex = activePoints[0]._index;
        var label = chart.data.labels[clickedElementindex];
        var value = chart.data.datasets[clickedDatasetIndex].data[clickedElementindex];
        var possible_rows = 5;
        var popup_values = []; 
        var index_popup_values = 0;
        var notify, min_thres, max_thres;
        
        popup_values["title"] = chart.config.data.datasets[0].label;
        popup_values["label"] = label;
        console.log(popup_values["label"]);
        popup_values["value"] = value;
        console.log(popup_values["value"]);
        
        if (MESSAGGIO_NODERED_Punto_notify){
          notify = "notify text "+ NUMERO_CASUALE_A;
          console.log(notify);
          popup_values["notify"] = notify;
        }
        if (MESSAGGIO_NODERED_Punto_min_thres){
          //@TODO collegare
          MESSAGGIO_NODERED_Punto_min = NUMERO_CASUALE_B;
          min_thres = MESSAGGIO_NODERED_Punto_min;
          popup_values["min_thres"] = min_thres;
        }
        if (MESSAGGIO_NODERED_Punto_max_thres){
          //@TODO collegare
          MESSAGGIO_NODERED_Punto_max = NUMERO_CASUALE_C;
          max_thres = MESSAGGIO_NODERED_Punto_max;
          popup_values["max_thres"] = max_thres;
        }
        //console.log("Clicked Label: " + label + " - Value: " + value);
        showPopUp(chart_canvas, ref_overlay, popup_values);
      }
    }
}

var margin_top = 8;
function showPopUp(chart_canvas, ref_overlay, popup_values_list){
    createPopUpContent(ref_overlay, popup_values_list);
    console.log("popup created");
  
    //var overlay = chart_canvas.cloneNode(false);
    //var overlay_pos = chart_canvas.getBoundingClientRect();
    var overlay = ref_overlay;
    var overlay_pos = chart_canvas.getBoundingClientRect();
    overlay.id = "graph_overlay_"+chart_canvas.id;
    overlay.style.width = chart_canvas.style.width;
    overlay.style.height = chart_canvas.style.height;
    overlay.style.visibility = "visible";
    overlay.style.top = getRelativePosition(chart_canvas) + margin_top +"%";
    //overlay.getElementsByClassName("close")[0].onclick = ;
    //chart_canvas.parentNode.append(overlay);
}

var optional_values = [];
function createPopUpContent(overlay, value_list){
  console.log("creating popup content");
  //console.log(value_list);
  var label = overlay.getElementsByClassName('overlay_label')[0];
  var value = overlay.getElementsByClassName('overlay_value')[0];
  var tits = overlay.parentNode.getElementsByClassName('overlay_tit')[0];
  tits.innerHTML = value_list.title;
  label.innerHTML = value_list.label;
  value.innerHTML = value_list.value;
  if(typeof optional_values !== "undefined"){
    deleteOptionalOnHide(optional_values);
  }
  console.log(" @@@@@@@@@@ "+value_list.min_thres);
  if(value_list.notify){
    var div_not = document.createElement("div");
    div_not.className = "row notify_overlay";
    var p_not = document.createElement("p");
    var not_t = document.createTextNode(value_list.notify);
    p_not.className = "col-sm-12 col-md-12 col-lg-12 notify";
    p_not.append(not_t);
    div_not.append(p_not)
    overlay.append(div_not);
    optional_values.push(div_not);
  }
  //se non metto === 0, da indietro false sul check di esistenza se il valore è uguale a 0
  //@TODO Clean and simplify - works fine for tests
  if ((value_list.min_thres === 0 || value_list.min_thres) || 
     (value_list.max_thres === 0 || value_list.max_thres) || 
     ((value_list.min_thres === 0 || value_list.min_thres) && (value_list.max_thres === 0 || value_list.max_thres))){
      var div_thres = document.createElement("div");
      div_thres.className = "row threshold_overlay";
      if ((value_list.min_thres === 0 || value_list.min_thres) && (value_list.max_thres === 0 || value_list.max_thres)){
        var p_min = document.createElement("p");
        var min_t = document.createTextNode(value_list.min_thres);
        var p_max  = document.createElement('p');
        var max_t = document.createTextNode(value_list.max_thres);
        p_min.className = "col-sm-6 col-md-6 col-lg-6 min_threshold_overlay_text";
        p_max.className = "col-sm-6 col-md-6 col-lg-6 max_threshold_overlay_text";
        p_min.append(min_t);
        div_thres.append(p_min);
        div_thres.append(p_max);
        overlay.append(div_thres);
      }
      else if (value_list.min_thres === 0 || value_list.min_thres){
        console.log("MIN THRES; "+value_list.min_thres);
        var p_min = document.createElement("p");
        var min_t = document.createTextNode(value_list.min_thres);
        p_min.className = "col-sm-6 col-md-6 col-lg-6 min_threshold_overlay_text";
        p_min.append(min_t);
        div_thres.append(p_min);
        overlay.append(div_thres);
        optional_values.push(div_thres);
      }
      else if (value_list.max_thres === 0 || value_list.max_thres){
        var p_max  = document.createElement('p');
        var max_t = document.createTextNode(value_list.max_thres);
        p_max.className = "col-sm-6 col-md-6 col-lg-6 max_threshold_overlay_text";
        p_max.append(max_t);
        div_thres.append(p_max);
        overlay.append(div_thres);
        optional_values.push(div_thres);
      }
    }
}

var deletable = false;

function getRelativePosition(canvas){
    var bodyRect = canvas.parentNode.getBoundingClientRect(),
    elemRect = canvas.getBoundingClientRect(),
    offset = elemRect.top - bodyRect.top;
    return offset;
}
function hidePopUp(overlay_ref){ 
  overlay_ref.style.visibility = "hidden";
  deletable = true;
  /*console.log(overlay_ref.parentNode);
  overlay_ref.parentNode.removeChild(overlay_ref);
  return false;*/
}

function deleteOptionalOnHide(element_list){
  if(deletable){
    for (var i = 0; i < element_list.length;i++){
      var deleted = element_list[i].parentNode.removeChild(element_list[i]);
      console.log("Deleted: "+deleted);
        /*
      if (i < 3){
        var deleted = element_list[i].parentNode.removeChild(element_list[i]);
        console.log("Deleted: "+deleted);
      } */
      /*else {
        var deleted = element_list[i].parentNode.parentNode.removeChild(element_list[i]);
        console.log("Deleted: "+deleted);
      }*/
      //element_list[i].parentNode.removeChild(element_list[i]);
    } 
    console.log("deletable");
    optional_values = []
    deletable = false;
    //console.log(element.childNodes[0]);
    //element.childNodes[0].parentNode.removeChild(element.childNodes[0]);
  }
}

var ref_cont = document.getElementById("containerHeart");
var ref_canva = document.getElementById("heartChart");
var ref_over = ref_cont.getElementsByClassName("graph_overlay")[0];
getPointOnclick(ref_canva,myChart_HEART,ref_over);
