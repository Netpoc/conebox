<template>
    <div>
      <apexchart type="line" height="250" :options="chartOptions" :series="series"></apexchart>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Chart',
    data() {
      return {
        series: [{
          name: 'Sample Data',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        chartOptions: {
          chart: {
            height: 150,
            type: 'bar'
          },
          
          xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
          }
        }
      };
    }
  };
  </script>
  
  <style>
  /* Add any styles if necessary */
  </style>
  