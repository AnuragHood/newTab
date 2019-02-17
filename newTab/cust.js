$(document).ready(function() {
	$('.carousel').carousel({
  interval: 2000
})
	$('#body').css('height',$(window).height())
	//$('#searchBtn').css('width',$(window).width())
    console.log("ready!");
    let i = 0;
	let j = 0;
    let flag = false;
    
    function randomNumberFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    var newarray = ["#00FFFF", "#008080", "#6ed3cf", "#9068be", "#e1e8f0", "#e62739"]
    var randomnumber = randomNumberFromRange(0, 4);
    $('#body').css('background-color', newarray[randomnumber])
    var interval = setInterval(function() {
        var momentNow = moment();
        $('#date').html(momentNow.format('YYYY MMMM DD') + ' ' + momentNow.format('dddd').substring(0, 3).toUpperCase());
        $('#time').html(momentNow.format(' hh:mm:ss A'));
    }, 100);


$('#myCarousel').carousel({
  interval: 5000
});
$('#reminderModal').on('show.bs.modal', function (event) {
	editFlag =false;
  let k =0;
  var button = $(event.relatedTarget);
  var modal = $(this)
  
  modal.find('.modal-title').text('Reminders')
 $('.table-dark > tbody').empty();
 $('.table-dark').css('display','none');
  console.log('total reminders:'+localStorage.getItem("reminderCount"));
  if(localStorage.getItem("reminderCount")=="null" ||localStorage.getItem("reminderCount")=="0"  ){
	  $('.alert-dark').css('display','block');
	  	$('.table-dark').css('display','none');
$('#modalForm1').css('display','none');
	  flag=true;
  }
 
  else{
	  
	for(let j=1;j<=parseInt(localStorage.getItem("reminderCount"));j++){
	
		if(localStorage.getItem("reminderTimeDate"+j)==null || localStorage.getItem("reminderTimeDate"+j)=="0"){
		console.log("null data found"+localStorage.getItem("reminderTimeDate"+j));
		}
		else{
					 k++;
                    $('.table-dark > tbody').append('<tr id="' + localStorage.getItem("reminderTimeDate" + j) + '"><td>' + k + '</td><td class="checkboxContainer"><label class="switch"><input type="checkbox" '+localStorage.getItem("onOff" + j)+' class="toggle"><span class="slider"></span></label></td><td >' + localStorage.getItem("reminderTimeDate" + j) + '</td><td ">' + localStorage.getItem("reminderTitle" + j) + ' </td><td><a href="#" ><i class="fa fa-trash delete" aria-hidden="true"></i></a></td></tr>');
console.log('saved no null data');

		}
	
flag=false;	
	}  
	$('.table-dark').css('display','');
$('#modalForm1').css('display','none');
 $('.alert-dark').css('display','none');
 

  }
});
 $('#datetimepicker').bootstrapMaterialDatePicker({
format: 'DD/MM/YYYY HH:mm',
shortTime: false,

date: true,
time: true,
monthPicker: false,
year: false,
clearButton: false,
nowButton: false,
switchOnClick: true,

triggerEvent: 'focus',
lang: 'en',
weekStart: 1,
});
 setInterval(function() {
        
 	$('#timeDateCard').addClass('transformation');
       },1000); 
setInterval(function() {
         $('#timeDateCard').removeClass('transformation');
 	
       },2000);  

//$('#timeDateCard').css('transform','space(1.2)');
$('#body').css('max-height',$(window).height());
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});
$('#showReminderForm').click(function(){
$('#modalForm1').css('display','block');	
});


	
$('#setReminder').click(function(){
if(!editFlag)	{
i++;
if(flag){
	localStorage.setItem("reminderCount",i);
}
else{
localStorage.setItem("reminderCount",parseInt(localStorage.getItem("reminderCount"))+1);	
}

localStorage.setItem('reminderTitle'+localStorage.getItem("reminderCount"),$('#formGroupExampleInput').val());
localStorage.setItem('reminderTimeDate'+localStorage.getItem("reminderCount"),$('#datetimepicker').val());	
		localStorage.setItem('onOff' + localStorage.getItem("reminderCount"), "checked");
$('.table-dark > tbody').append('<tr id="'+localStorage.getItem("reminderTimeDate"+localStorage.getItem("reminderCount"))+'"><td>'+parseInt(localStorage.getItem("reminderCount"))+'</td><td class="checkboxContainer"><label class="switch"><input type="checkbox" checked class="toggle"><span class="slider"></span></label></td><td>'+localStorage.getItem("reminderTimeDate"+localStorage.getItem("reminderCount"))+'</td><td >'+localStorage.getItem("reminderTitle"+localStorage.getItem("reminderCount"))+' </td><td><a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></td></tr>');
$('.table-dark').css('display','');
$('#modalForm1').css('display','none');
$('.alert-dark').css('display','none');
console.log(localStorage.getItem("reminderTimeDate"+localStorage.getItem("reminderCount")));
}
else{
editReminder();	
}
});
$(window).on('beforeunload', function(){
    localStorage.setItem("reminderCount",localStorage.getItem("reminderCount"));
	localStorage.setItem("todoCount",localStorage.getItem("todoCount"));
	console.log("i saved is:"+localStorage.getItem("reminderCount"));
});
let alarm=false;
var interval = setInterval(function() {
	 var momentNow = moment();
	 for(let j=1;j<=parseInt(localStorage.getItem("reminderCount"));j++){
		if(localStorage.getItem("reminderTimeDate"+j)==null || localStorage.getItem("reminderTimeDate"+j)=="0"){
		console.log("null data found"+localStorage.getItem("reminderTimeDate"+j));
		}
		else{
			
			if(localStorage.getItem("reminderTimeDate"+localStorage.getItem("reminderCount"))==momentNow.format('DD/MM/YYYY') + ' ' +momentNow.format('HH:mm')){
				
	if(!alarm){
	triggerAlarm();
	console.log('alarm function triggered!!')
	$('.stopBtn').attr('id',localStorage.getItem("reminderTimeDate"+localStorage.getItem("reminderCount")));
	alarm=true;
	//return false;
	}
}
		}
	}

}, 1000);
function triggerAlarm(){
	$('.modal.fade').modal('hide');
	 var momentNow = moment();
	console.log(localStorage.getItem('reminderTitle'+localStorage.getItem("reminderCount")));
	console.log(localStorage.getItem("reminderTimeDate"+localStorage.getItem("reminderCount")));
	console.log(momentNow.format('DD/MM/YYYY') + ' ' +momentNow.format('HH:mm'));
	 
	 $('#alarmModal').modal('show');
	 $('#exampleModalCenterTitle').text(localStorage.getItem("reminderTitle"));
	 $('#myAudio')[0].play();
}
//delete Reminder
$(document).delegate('.fa.fa-trash', 'click', function()
{
	console.log('delete clicked');
	let id =$(this).closest('tr').attr('id');
	console.log(id);
	for(let j=1;j<=parseInt(localStorage.getItem("reminderCount"));j++){
		if(localStorage.getItem("reminderTimeDate"+j)==null || localStorage.getItem("reminderTimeDate"+j)=="0"){
		console.log("null data found"+localStorage.getItem("reminderTimeDate"+j));
		}
		else{
			if(id==localStorage.getItem("reminderTimeDate"+j)){
				localStorage.removeItem("reminderTimeDate"+j);
				localStorage.removeItem("reminderTitle"+j);
				localStorage.setItem("reminderCount",parseInt(localStorage.getItem("reminderCount"))-1);	
				
			console.log('deleted');	
			$('#reminderModal').modal('hide');
                    $('#reminderModal').modal('show');
			return false;
			}


		}
	}
	
	
	
});	

//snooze Reminder
$('#snooze').click(function(){
	 $('#myAudio')[0].pause();
	$('#alarmModal').modal('hide');
	setTimeout(function(){ 
	triggerAlarm();
	console.log("snooze triggered!!");
	}, 600000);
	var diffTime = 600;
	 //var moment = moment();
var duration = moment.duration(diffTime*1000, 'milliseconds');
var interval = 1000;
 $('.alert-dark').css('display','block')
setInterval(function(){
  duration = moment.duration(duration - interval, 'milliseconds');
    $('.alert-dark').text('Reminder snoozed for:   '+duration.hours() + ":" + duration.minutes() + ":" + duration.seconds());
	console.log(duration.hours() + ":" + duration.minutes() + ":" + duration.seconds());
}, interval);
});

//stop Alarm
$('.stopBtn').click(function(){
	 $('#myAudio')[0].pause();
	 $('#alarmModal').modal('hide');
	let id= $('.stopBtn').attr('id');
	$('#alarmTable > tbody  > tr').each(function() {
		console.log('reached inside tr');
		
		if($(this).attr('id')==id){
			console.log('id matched'+id+" $(this).attr('id') "+$(this).attr('id'));
			$(this).find('td').each (function(){
				console.log('reached inside td');
				if($(this).hasClass('checkboxContainer')){
					$('.toggle').prop('checked',false)
					$(this > 'input[type=checkbox]').removeAttr('Checked'); 
					console.log('reached inside');
				}
			})
		}
	});
});

$('#edit').click(function(){
	
	if(!editFlag){
	$('#alarmTable').find('tr').each(function(){
        $(this).find('td').eq(4).after('<td> <input type="checkbox" class="form-check-input" id="1" ></td>');
		editFlag =true;
   });	
	}
	
});
//edit Reminder
let tr;
 $(document).delegate('.form-check-input', 'click', function()
{
	tr = $(this).closest('tr'); 
	 console.log('hello');
        if(this.checked) {
          $('#modalForm1').css('display','block');
	$('#alarmTable').find('tr').each(function(){
        $(this).find('td').eq(5).css('display','none');
		
   });
	
         $('#formGroupExampleInput').val($(tr).find('td').eq(3).text()); 
		 console.log($(tr).find('td').eq(3).text());
		 $('#datetimepicker').val($(tr).find('td').eq(2).text());
        }
      editReminder=function editReminder(){

			console.log($(tr).find('td').eq(3).text());
		$(tr).find('td').eq(2).html($('#datetimepicker').val());	
		$(tr).find('td').eq(3).html($('#formGroupExampleInput').val());
		var count = $.trim($(tr).find('td').eq(0).text());
		$('#modalForm1').css('display','none');
		localStorage.setItem('reminderTitle'+count,$('#formGroupExampleInput').val());
		localStorage.setItem('reminderTimeDate'+count,$('#datetimepicker').val());	
		}     
    });
	
	//Todo
	$('#todoModal').on('show.bs.modal', function (event) {
	$('#todoForm').css('display','none');
	
	$('#showTODOForm').click(function(){
		$('#todoForm').css('display','block');
	});
	
	
	});
	
	$('#todoSubmit').click(function(){
		j++;
		localStorage.setItem("todoCount",j);
		localStorage.setItem('todoTitle'+localStorage.getItem("todoCount"),$('#todoTitle').val());
		localStorage.setItem('todoText'+localStorage.getItem("todoCount"),$('#todo-text').val());	
		
	})
});
