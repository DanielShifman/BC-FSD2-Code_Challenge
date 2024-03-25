<template>
  <div class="admin-page">
    <h1>{{ greeting }}</h1>
    <h2>{{ adminPageHeader }}</h2>
  </div>
  <div class="tab-list">
    Signed in as: {{loggedInUserData.username}}<br>
    <button type="button" id="signout-button" v-on:click=signOut>
      Sign Out
    </button>
    <button type="button" id="add-user-button" v-on:click="clearFields();tab='new-user'" v-show="tab!=='new-user'">
      New User
    </button>
    <button type="button" id="list-users-button" v-on:click="tab='user-list'" v-show="tab!=='user-list'">
      List Users
    </button>
    <button type="button" id="refresh-list-button" v-on:click="refreshUserList" v-show="tab==='user-list'">
      Refresh List
    </button>
    <button type="button" id="inventory-button" v-on:click="this.$router.push('/inventory')" v-show="tab!=='inventory'">
      Return to Inventory
    </button>
  </div>
  <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
  <div class="table-wrapper">
    <table id="user-table" class="tbl" v-show="tab==='user-list'">
      <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Name</th>
        <th>Role</th>
        <th>Permission Level</th>
        <th>Modify</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in userData" :key="user.username">
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.permLevel }}</td>
        <td><button v-on:click="modifyUser(user.id)" :disabled="loggedInUserData.id===user.id">Modify</button></td>
        <td><button v-on:click="deleteUser(user.id)" :disabled="loggedInUserData.id===user.id">Delete</button></td>
      </tr>
      </tbody>
    </table>
    <table id="new-user-table" class="tbl" v-show="tab==='new-user'">
      <thead>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Username:</td>
        <td><input type="text" v-model="username" required></td>
      </tr>
      <tr>
        <td>Password:</td>
        <td><input type="password" v-model="password" required></td>
      </tr>
      <tr>
        <td>Confirm Password:</td>
        <td><input type="password" v-model="confirmPassword" required></td>
      </tr>
      <tr>
        <td>Email:</td>
        <td><input type="text" v-model="email" required></td>
      </tr>
      <tr>
        <td>Name:</td>
        <td><input type="text" v-model="name" required></td>
      </tr>
      <tr>
        <td>Role:</td>
        <td><input type="text" v-model="role" required></td>
      </tr>
      <tr>
        <td>Permission Level:</td>
        <td><input type="number" v-model="permLevel" required min="1" max="3"></td>
      </tr>
      <tr>
        <td>Permissions:</td>
        <td>
          <ul id="perm-list" style="list-style: none">
            <li><strong>Can</strong> Read</li>
            <li><strong>Can</strong><strong :hidden="permLevel > 1">not</strong> Write</li>
            <li><strong>Can</strong><strong :hidden="permLevel > 2">not</strong> Admin</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td></td>
        <td><button v-on:click="createUser">Create User</button></td>
      </tr>
      </tbody>
    </table>
    <table id="modify-user-table" class="tbl" v-show="tab==='modify-user'">
      <thead>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Username:</td>
        <td><input type="text" v-model="username" required></td>
      </tr>
      <tr>
        <td>New Password:</td>
        <td><input type="password" v-model="password" required></td>
      </tr>
      <tr>
        <td>Confirm New Password:</td>
        <td><input type="password" v-model="confirmPassword" required></td>
      </tr>
      <tr>
        <td>Email:</td>
        <td><input type="text" v-model="email" required></td>
      </tr>
      <tr>
        <td>Name:</td>
        <td><input type="text" v-model="name" required></td>
      </tr>
      <tr>
        <td>Role:</td>
        <td><input type="text" v-model="role" required></td>
      </tr>
      <tr>
        <td>Permission Level:</td>
        <td><input type="number" v-model="permLevel" required min="1" max="3"></td>
      </tr>
      <tr>
        <td>Permissions:</td>
        <td>
          <ul id="perm-list" style="list-style: none">
            <li><strong>Can</strong> Read</li>
            <li><strong>Can</strong><strong :hidden="permLevel > 1">not</strong> Write</li>
            <li><strong>Can</strong><strong :hidden="permLevel > 2">not</strong> Admin</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td></td>
        <td><button v-on:click="updateUser">Modify User</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { BACKEND_ADDR } from "@/const";

export default {
  name: "AdminPage",
  data() {
    return {
      greeting: 'BC Paint Co. Inventory!',
      adminPageHeader: 'Administration',
      loggedInUserData: {},
      userData: [],
      tab: "user-list",
      username: '',
      password: '',
      confirmPassword: '',
      name: '',
      email: '',
      role: '',
      permLevel: 1,
      errorMessage: '',
      successMessage: ''
    };
  },
  created() {
    const userQuery = this.$route.query.loggedInUserData;
    if (userQuery === undefined) {
      this.fetchUserData()
      return
    }
    const dataStr = atob(userQuery)
    this.loggedInUserData = JSON.parse(dataStr)
  },
  mounted() {
    this.fetchUserDataList()
  },
  methods: {
    fetchUserData() {
      fetch(`${BACKEND_ADDR}/data?user`, { //TODO: Convert to https
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            this.errorMessage = 'Unable to retrieve user data!';
          }
        })
        .then(data => {
          if (data !== undefined) {
            this.loggedInUserData = data;
          }
          else {
            this.loggedInUserData = {username: "USERNAME UNKNOWN"}
            this.$router.push("/")
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred!';
        });
    },
    fetchUserDataList() {
      fetch(`${BACKEND_ADDR}/data?users`, { //TODO: Convert to https
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            this.errorMessage = 'Unable to retrieve user data!';
          }
        })
        .then(data => {
          if (data !== undefined) {
            for (let i = 0; i < data.length; i++) {
              this.userData.push(data[i])
              console.log(data[i])
            }
          }
          else {
            this.loggedInUserData = {username: "USERNAME UNKNOWN"}
            this.$router.push("/")
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred!';
        });
    },
    signOut() {
      // POST request to backend
      fetch(`${BACKEND_ADDR}/signout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }, credentials: "include"
      })
        .then(response => {
          if (response.ok) {
            this.successMessage = 'Signed out successfully';
            this.$router.push('/')
          } else {
            this.errorMessage = 'Failed to sign out';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred!';
        });
    },
    createUser() {
      // Reset messages
      this.errorMessage = '';
      this.successMessage = '';

      // Perform validation
      if (!this.username || !this.password || !this.confirmPassword || !this.email || !this.name || !this.role) {
        this.errorMessage = 'Please fill in all fields';
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }
      if (this.permLevel < 1 || this.permLevel > 3) {
        this.errorMessage = 'Permission level must be between 1 and 3';
        return;
      }

      const newUser = {
        username: this.username,
        password: this.password,
        email: this.email,
        name: this.name,
        role: this.role,
        permLevel: this.permLevel
      };

      // Make the API request to create the user
      fetch(`${BACKEND_ADDR}/data?addUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        }, credentials: "include",
        body: JSON.stringify(newUser)
      })
        .then(response => {
          if (response.status === 201) {
            this.successMessage = 'User created successfully';
            // Clear input fields after successful creation
            this.clearFields();
          } else {
            // Handle error response from the server
            this.errorMessage = 'Failed to create user';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred while creating user';
        });
    },
    modifyUser(userID) {
      console.log(`Modify: ${userID}`)
      // Reset messages
      this.errorMessage = '';
      this.successMessage = '';
      // Clear input fields
      this.clearFields();
      // Set the tab to modify user
      this.tab = 'modify-user';
      // Set the current user data in the form fields
      const user = this.userData.find(user => user.id === userID);
      this.username = user.username;
      this.email = user.email;
      this.name = user.name;
      this.role = user.role;
      this.permLevel = user.permLevel;
    },
    updateUser() {
      // Reset messages
      this.errorMessage = '';
      this.successMessage = '';

      // Perform validation (both password fields are optional, but if one is filled, the other must be too)
      if (!this.username || !this.email || !this.name || !this.role) {
        this.errorMessage = 'Please fill in all fields';
        return;
      }

      if ((this.password && !this.confirmPassword) || (!this.password && this.confirmPassword)) {
        this.errorMessage = 'Both password fields must be filled to update password';
        return;
      }

      if (this.password && this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      const updatedUser = {
        id: this.userData.find(user => user.username === this.username).id,
        username: this.username,
        password: this.password,
        email: this.email,
        name: this.name,
        role: this.role,
        permLevel: this.permLevel
      };

      // Make the API request to update the user
      fetch(`${BACKEND_ADDR}/data?updateUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        }, credentials: "include",
        body: JSON.stringify(updatedUser)
      })
        .then(response => {
          if (response.status === 202) {
            this.successMessage = 'User updated successfully';
            // Clear input fields after successful update
            this.clearFields();
            // Update the user list after successful update
            this.userData = this.userData.map(user => {
              if (user.username === updatedUser.username) {
                return updatedUser;
              }
              return user;
            });
            // Set the tab back to user list
            this.tab = 'user-list';
          } else {
            // Handle error response from the server
            this.errorMessage = 'Failed to update user';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred while updating user';
        });

    },
    deleteUser(userID) {
      // Make the API request to delete the user
      fetch(`${BACKEND_ADDR}/data?deleteUser=${userID}`, {
        method: 'DELETE',
        credentials: "include",
      })
        .then(response => {
          if (response.status === 202) {
            this.successMessage = 'User deleted successfully';
            // Update the user list after successful deletion
            this.userData = this.userData.filter(user => user.id !== userID);
          } else {
            // Handle error response from the server
            this.errorMessage = 'Failed to delete user';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred while deleting user';
        });
    },
    refreshUserList() {
      this.userData = [];
      this.fetchUserDataList();
    },
    clearFields() {
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
      this.email = '';
      this.name = '';
      this.role = '';
      this.permLevel = 1;
    }
  }
}
</script>


<style scoped>
.table-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
}

.tbl {
  width: auto;
  table-layout: fixed;
  border-collapse: collapse;
}

.tbl th,
.tbl td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.tbl th {
  background-color: #f2f2f2;
}

.error-message, .success-message {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.error-message {
  background-color: #FFCCCC;
  color: #FF0000;
}

.success-message {
  background-color: #CCFFCC;
  color: #008000;
}

</style>
