<template>
  <div id="app">
    <v-card-title>
      <v-btn color="primary" dark class="mb-2" @click="storeData">
        Randomize Data
      </v-btn>
      
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :v-model="selected"
      :items-per-page="2"
      :items="employeeData"
      :search="search"
      :sort-by="['calories', 'fat']"
      :sort-desc="[false, true]"
      multi-sort
      class="elevation-1"
    >
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="headline"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItem(item)"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template> -->
      <div class="red text-center">
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </div>

      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.id }}</td>
          <td>{{ row.item.jobTitle }}</td>
          <td>{{ row.item.email }}</td>
          <td>{{ row.item.fname }}</td>
          <td>{{ row.item.country }}</td>
          <td>{{ row.item.salaryQ1 }}</td>

          <td>{{ row.item.salaryQ2 }}</td>
          <td>{{ row.item.salaryQ3 }}</td>
          <td>{{ row.item.salaryQ4 }}</td>
          <!-- <td>{{ row.item.totalSalary }}</td>
          <td>{{ row.item.totalHrs }}</td> -->

          <td>
            <v-btn class="mr-2" small @click="onButtonClick(row.item)">
              <v-icon dark>mdi-eye</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn class="mr-2" small @click="onButtonClick(row.item)">
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn class="mr-2" small @click="onButtonClick(row.item)">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <GChart
      type="ColumnChart"
      @ready="onChartReady"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { GChart } from "vue-google-charts";

export default {
  components: {
    GChart,
  },
  name: "app",
  data() {
    return {
      search: "",
      selected: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Id",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Job Title", value: "jobTitle" },
        { text: "Email Address", value: "email" },
        { text: "Full Name", value: "fname" },

        { text: "Country", value: "country" },
        { text: "Salary Q1", value: "salaryQ1" },
        { text: "Salary Q2", value: "salaryQ2" },
        { text: "Salary Q3", value: "salaryQ3" },
        { text: "Salary Q4", value: "salaryQ4" },
        { text: "Total Salary", value: "totalSalary" },
        { text: "Total Hrs", value: "totalHrs" },
      ],
      employeeData: [],

      employee: {},
      chartData: [
        ["Quarter", "Employee salary", "Working hours"],

        ["salaryQ1", 456, 400],
        ["salaryQ2", 1170, 460],
        ["salaryQ3", 660, 1120],
        ["salaryQ4", 1030, 540],
      ],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Employee Report",
        },
      },
    };
  },
  methods: {
    onChartReady(chart, google) {
      const query = new google.visualization.Query(
        "https://docs.google.com/spreadsheets/d/1qhyJnMpiuuwKLCY3t6W4bp6XKnixTFekAPlCpR8AcK0/edit?usp=sharing"
      );
      query.send((response) => {
        const options = {
          title: "Creating a Chart from a Separate Spreadsheet",
        };
        const data = response.getDataTable();
        chart.draw(data, options);
      });
    },
    storeData() {
      var i;
      for (i = 0; i < 10; i++) {
        this.employee = {
          id: this.$faker().random.uuid(),
          jobTitle: this.$faker().name.jobTitle(),
          email: this.$faker().internet.email(),
          fname: this.$faker().name.findName(),
          // lname: this.$faker().name.lastName(),
          country: this.$faker().address.country(),
          salaryQ1: this.$faker().random.number(),
          salaryQ2: this.$faker().random.number(),
          salaryQ3: this.$faker().random.number(),
          salaryQ4: this.$faker().random.number(),
          company: this.$faker().company.companyName(),
          workingHoursQ1: this.$faker().random.number(),
          workingHoursQ2: this.$faker().random.number(),
          workingHoursQ3: this.$faker().random.number(),
          workingHoursQ4: this.$faker().random.number(),
        };
        this.employeeData.push(this.employee);
      }
    },
  },
};
</script>
<style >
</style>
