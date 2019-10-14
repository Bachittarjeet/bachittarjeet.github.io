$("document").ready(function() {

    var url = "https://api.github.com/search/"
    var users = ['bachittarjeet', 'amustaque97', 'coryrylan']
    pullRequests(users)




    async function pullRequests(users) {
        console.clear()
        var api = '';
        var jsonResponse = [];
        var scores = [];

        for (var j = 0; j < users.length; j++) {
            scores.push({ "username": users[j] })
            scores[j]["scores"] = 0;

            api = url + "issues?q=author:" + users[j] + " type:pull";
            const response = await fetch(api)
            const result = await response.json()
            result.items.forEach(i => {
                jsonResponse.push(i)
            })

        }
        //console.log(jsonResponse)
        $("#list").empty()
        jsonResponse.forEach(i => {
            try {
                var postdate = i.created_at.split("T")[0].split('-')
                var curdate = new Date(postdate[0], postdate[1], postdate[2])
                var startdate = new Date("2019", "10", "01")
                var enddate = new Date("2019", "10", "30")

                i.node_id = i.node_id.split('=')[0]
                if (curdate.getTime() > startdate.getTime() && curdate.getTime() < enddate.getTime()) {


                    $("#list").append('<li class="list-group-item"><div class="row"><div class="col-xs-2 col-md-1"><img src="' + i.user.avatar_url + '" class="img-circle img-responsive" width=80 alt="" /></div><div class="col-xs-10 col-md-11" id="' + i.node_id.split('=')[0] + '"><div><a href="' + i.html_url + '"">' + i.body + '</a><div class="mic-info">By: <a href="' + i.user.url + '">' + i.user.login + '</a> on <a href="' + i.repository_url + '">' + i.repository_url.split('https://api.github.com/repos/')[1] + '</a>  at ' + i.created_at.split('T')[0] + ' ' + i.created_at.split('T')[1].split("Z")[0] + '</div></div><div class="comment-text">' + i.title + '</div><div class="action"><button type="button" class="btn btn-primary btn-xs" title="Edit">' + i.state + '</button></div></div></div></li>');
                    var index = users.findIndex(user => user == i.user.login.toLowerCase());
                    //console.log(index)
                    if (i.state == "closed") {
                        scores[index]["scores"] += 5;
                        $("#" + i.node_id + " .btn").addClass('btn-success');
                    } else if (i.state == "open") {
                        scores[index]["scores"] += 1;
                        $("#" + i.node_id + " .btn").addClass('btn-warning');
                    } else {
                        $("#" + i.node_id + " .btn").addClass('btn-danger');
                    }
                }
            } catch (Exception) {
                // console.log(Exception)
            }

        })



        $("#leaderboard").empty();
        $("#leaderboard").append("<tr><th>Name</th><th>Score</th></tr>")

        scores.sort(function(a, b) {
                return b.scores - a.scores
            })
            //console.log(scores)
        for (var i = 0; i < scores.length; i++) {
            $("#leaderboard").append("<tr><td>" + scores[i]['username'] + "</td><td>" + scores[i]['scores'] + "</td></tr>")
        }

        delete api, jsonResponse, scores
        $("#refresh").html("Last refreshed at " + new Date().getHours() + " :" + new Date().getMinutes())
        setInterval(function() {
            pullRequests(users);
        }, 60000)

    }

})