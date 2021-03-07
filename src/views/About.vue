<template>
  <div id="app" class="container">
    <v-app>
      <v-card-title>
        <span class="headline">
          <span style="color: white" color="white"> Employee details</span>
        </span>

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
        :items="employeeData"
        class="elevation-1"
        :items-per-page="100"
        :search="search"
        loading
        loading-text="Loading... Please wait"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              style="margin-right: 16px"
              color="pink"
              class="mb-2"
              @click="generateData"
            >
              Generate Data
            </v-btn>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark class="mb-2" color="pink" v-bind="attrs" v-on="on">
                  Add Employee
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.id"
                          label="Employee ID"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.jobTitle"
                          label="Job Title"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.fname"
                          label="Full Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.country"
                          label="Country"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.salaryQ1"
                          label="Salary Q1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.salaryQ2"
                          label="Salary Q2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.salaryQ3"
                          label="Salary Q3"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.salaryQ4"
                          label="Salary Q4"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="viewdialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Employee details</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.id"
                          label="Employee ID"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.jobTitle"
                          label="Job Title"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.fname"
                          label="Full Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.country"
                          label="Country"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.salaryQ1"
                          label="Salary Q1"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.salaryQ2"
                          label="Salary Q2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.salaryQ3"
                          label="Salary Q3"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.salaryQ4"
                          label="Salary Q4"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDialog">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="viewItem(item)"> mdi-eye </v-icon>
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>
<script>
export default {
  name: "About",
  data: () => ({
    employee: {},
    search: "",
    options: { groupBy: "jobTitle" },
    employeeData: [],
    dialog: false,
    loading: false,
    dialogDelete: false,
    viewDialog: false,
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Job Title", value: "jobTitle", groupable: true },

      { text: "Email Address", value: "email" },
      { text: "Full Name", value: "fname" },

      { text: "Country", value: "country" },
      { text: "Salary Q1", value: "salaryQ1" },
      { text: "Salary Q2", value: "salaryQ2" },
      { text: "Salary Q3", value: "salaryQ3" },
      { text: "Salary Q4", value: "salaryQ4" },
      // { text: "Total Salary", value: "totalSalary" },
      // { text: "Total Hrs", value: "totalHrs" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Employee" : "Edit Item";
    },
    // employeeData() {
    //   console.log(
    //     "data",
    //     JSON.stringify(localStorage.getItem("EmployeeDetails"))
    //   );
    //   return localStorage.getItem("EmployeeDetails");
    // },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    viewdialog(val) {
      val || this.closeDialog();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.employeeData = JSON.parse(
      localStorage.getItem("EmployeeDetails") || "[]"
    );
  },
  mounted() {
    console.log(this.employeeData);
  },
  methods: {
    generateData() {
      let i;
      for (i = 0; i < 10000; i++) {
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
        console.log(this.employeeData);
      }
      localStorage.setItem(
        "EmployeeDetails",
        JSON.stringify(this.employeeData)
      );
    },

    viewItem(item) {
      console.log(item);

      this.editedIndex = this.employeeData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.viewdialog = true;
    },
    editItem(item) {
      console.log(item);
      this.editedIndex = this.employeeData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.employeeData.indexOf(item);
      console.log("delete", this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.employeeData.splice(this.editedIndex, 1);
      console.log("after delete", this.employeeData);
      localStorage.setItem(
        "EmployeeDetails",
        JSON.stringify(this.employeeData)
      );
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDialog() {
      this.viewDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.employeeData[this.editedIndex], this.editedItem);
      } else {
        this.employeeData.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>