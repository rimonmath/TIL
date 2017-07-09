var app = new Vue({
	el: '#root',
	data: {
		errorMessage: "",
		successMessage: "",
		question: [],
		showEditTipModal: false,
		showRegistrationModal: false,
		showLoginModal: false,
		successMessage: "",
		errorMessage: "",
		tipToSend: {},
		userDetails: {username:"", mobile:"", address:"", email:"", tip:"", emailTip: ""},
		tip: "",
		tips: [
			{ tipUrl: 'img/tip-02.png', name: 'Mummy-01 Nutella'},
			{ tipUrl: 'img/tip-02.png', name: 'Mummy-01 Nutella'},
			{ tipUrl: 'img/tip-02.png', name: 'Mummy-01 Nutella'},
			{ tipUrl: 'img/tip-02.png', name: 'Mummy-01 Nutella'},
			{ tipUrl: 'img/tip-02.png', name: 'Mummy-01 Nutella'},
			{ tipUrl: 'img/tip-02.png', name: 'Mummy-01 Nutella'},
			{ tipUrl: 'img/tip-02.png', name: 'Mummy-01 Nutella'},
			{ tipUrl: 'img/tip-02.png', name: 'Mummy-01 Nutella'},
			{ tipUrl: 'img/tip-02.png', name: 'Mummy-01 Nutella'},
			{ tipUrl: 'img/tip-02.png', name: 'Mummy-01 Nutella'},
			{ tipUrl: 'img/tip-02.png', name: 'Mummy-01 Nutella'},
			{ tipUrl: 'img/tip-02.png', name: 'Mummy-01 Nutella'}
		],
		prizes: [
	      { prizeTitle: 'Runner Up Prize', prizeDesc: '- 3D2N At Hilton Jakarta -', prizeImg: 'img/prizes-01.jpg'  },
	      { prizeTitle: 'First Prize', prizeDesc: '- 3D2N At Hilton Jakarta -', prizeImg: 'img/prizes-02.jpg' },
	      { prizeTitle: 'Grand Prize', prizeDesc: '- 3D2N At Hilton Jakarta -', prizeImg: 'img/prizes-03.jpg' }
	    ],
	    videos: [
			{ videoUrl: 'https://www.youtube.com/embed/i-2cFlTQ2jg' },
			{ videoUrl: 'https://www.youtube.com/embed/xdCCuaajKyM' },
			{ videoUrl: 'https://www.youtube.com/embed/gnhMOpF4zl4' },
			{ videoUrl: 'https://www.youtube.com/embed/yBcliC25BbU' }
		],
		recipes: [
			{ recipesUrl: 'img/prizes-01.jpg', caption: 'Mummy-01 Nutella'},
			{ recipesUrl: 'img/prizes-02.jpg', caption: 'Mummy-01 Nutella'},
			{ recipesUrl: 'img/prizes-03.jpg', caption: 'Mummy-01 Nutella'},
			{ recipesUrl: 'img/prizes-01.jpg', caption: 'Mummy-01 Nutella'},
			{ recipesUrl: 'img/prizes-02.jpg', caption: 'Mummy-01 Nutella'},
			{ recipesUrl: 'img/prizes-03.jpg', caption: 'Mummy-01 Nutella'}
		]
	},
	mounted: function() {
		console.log("MOUNTED");
		this.getQuestion();
	},
	methods: {
		getQuestion: function(){
			axios.get("http://localhost/mummypedia-res/API/api.php?action=read_question")
			.then(function(response) {
				// console.log(response);
				if (response.data.error) {
					app.errorMessage = response.data.message;
				}
				else {
					app.question = response.data.question;
				}
			});
		},

		saveUserInfoAndTip: function(){

			app.userDetails.tip = document.getElementById("finalTip").textContent;
			app.userDetails.emailTip = app.userDetails.email;
			var formData = app.toFormData(app.userDetails);

			axios.post("http://localhost/mummypedia-res/API/api.php?action=register_user", formData)
			.then(function(response) {
				console.log(response);

				app.userDetails = { username: "", mobile: "", email: "", address: "", tip: "", emailTip: "" };

				if(response.data.error){
					app.errorMessage = response.data.message;
					console.log("FAILED---->", response.data.message);
				} else {
					app.successMessage = response.data.mesage;
					console.log("SUCCESS---->", response.data.message);
				}
			});
		},

		editTip: function(){
			var editTipData = app.tipToSend;
			console.log("EDITED TIP",editTipData);
		},
		toFormData: function(obj){
			var form_data = new FormData();
			for(var key in obj) {
				form_data.append(key, obj[key]);
			}
			return form_data;
		},
		sendTip() {
			app.tipToSend = document.getElementById("editedtip").innerHTML;
		},
		clearMessage: function() {
			app.errorMessage = "";
			app.successMessage = "";
		}

	}


});