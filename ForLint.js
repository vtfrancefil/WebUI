        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        function getHeights() {
            var heights = Array.from({ length: 5 }, () => Math.floor(Math.random() * 18) + 3);
            return heights.filter(onlyUnique).sort((a, b) => a - b);
        }
        function getData(total, min, max) {
            var data = Array.from({ length: total }, () => Math.floor(Math.random() * max) + min);
            var sum = data.reduce((previous, current) => current += previous);
            var avg = sum / data.length;
            return {
                min: Math.min.apply(Math, data),
                avg: avg,
                max: Math.max.apply(Math, data),
            };
        }

        var minArr = [];
        var maxArr = [];
        var avgArr = [];
        var minofmin;

        var heights = getHeights();
        var data = heights.map(function (height) {

        var minmaxavg = getData(20, 1200, 1050);

        if (minofmin == undefined) {
            minofmin = minmaxavg.min;
        } else {
            minofmin = Math.min.apply(Math, [minmaxavg.min, minofmin]);
        }
            

        minArr.push([minmaxavg.min, height]);
        avgArr.push([minmaxavg.avg, height]);
        maxArr.push([minmaxavg.max, height]);
    });

        $("#chart1").kendoChart({
            chartArea: {
                height: 300,
                width: 200
            },
            title: {
                text: "Mould 10"
            },
            legend: {
                visible: false
            },
            seriesDefaults: {
                type: "scatterLine"
            },
            series: [{
                color:"green",
                name: "Min",
                data: minArr
            }, {
                color: "blue",
                name: "Avg",
                data: avgArr
            }, {
                color: "red",
                name: "Max",
                data: maxArr
            }],
            xAxis: {
                min: minofmin - (minofmin * 0.10),
                labels: {
                    visible: false
                }
            },
            yAxis: {
                max: Math.max.apply(Math, heights)  + 2,
                min: Math.min.apply(Math, heights) - 2
            },
            categoryAxis: [{
                categories: ["min", "avg", "max"],
                color: "#ff0000"
            }],
            tooltip: {
                visible: true,
                format: "height: {1} , Diameter: {0}"
            }
        });
   

        $("#export").on("click", function () {
            var chart = $("#chart1").data("kendoChart");
            var imageDataURL = chart.imageDataURL();
            $.ajax('/api/ProfileImage/SaveAsImage', {
                type: 'POST',
                data: imageDataURL
            });
        });