<template>
  <div class="inventory-page">
    <h1>{{ greeting }}</h1>
  </div>
  <div class="tab-list">
    Signed in as: {{userData.username}}<br>
    <button type="button" id="signout-button" v-on:click=signOut>
      Sign Out
    </button>
    <button type="button" id="user-info-button" v-on:click=displayUserInfo :disabled="tab==='user-info'">
      User Info
    </button>
    <button type="button" id="manage-users-button" v-on:click=manageUsers v-show="muButton">
      Manage Users
    </button>
    <br>
    <button type="button" id="inventory-button" v-on:click="this.clearMessages();tab='inventory'" v-show="tab!=='inventory'">
      Return to Inventory
    </button>
  </div>
  <div id="user-info" v-show="tab==='user-info'" style="text-align: left">
    <h2>{{userData.username}} Details</h2>
    <ul style="list-style: none">
      <li>Username: {{userData.username}}</li>
      <li>Name: {{userData.name}}</li>
      <li>Email: {{userData.email}}</li>
      <li>Role: {{userData.role}}</li>
      <li>
        Permissions:
        <ul>
          <li><strong>Can</strong> Read</li>
          <li><strong>Can</strong><strong :hidden="userData.permLevel > 1">not</strong> Write</li>
          <li><strong>Can</strong><strong :hidden="userData.permLevel > 2">not</strong> Admin</li>
        </ul>
      </li>
    </ul>
  </div>
  <h2 v-show="tab==='inventory'">{{paintStockHeader}}</h2>
  <div id="inv-options" v-show="tab==='inventory'">
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <button type="button" id="refresh-inv-button" v-on:click="refreshInventory">
      Refresh List
    </button>
    <button type="button" id="add-inv-button" v-on:click="newItem" v-show="tab!=='new-item'" v-if="canModify()">
      Add New Item
    </button>
  </div>
  <p v-show="tab==='inventory' && canModify()">Drag items to move them</p>
  <div id="paint-inv" class="stock-types" v-show="tab==='inventory'">
    <div v-for="stockType in paintStockCats" :key="stockType" class="stock-type" @dragover.prevent @drop="dropItem(stockType, $event)">
      <div class="droppable-area">
        <h3>{{ stockType }}</h3>
        <div class="inventory-item" v-for="item in getPaintByStock(stockType)" :key="item.id" :draggable="canModify()" @dragstart="dragStart(item, $event)" >
          {{ item.colour }}: {{ item.quantity }} available<br>
          <button v-if="canModify()" type="button" @click="modifyQuantity(item, 'decrement')">-</button>
          <button v-if="canModify()" type="button" @click="deleteItem(item.id)">Delete</button>
          <button v-if="canModify()" type="button" @click="modifyQuantity(item, 'increment')">+</button>
        </div>
      </div>
    </div>
  </div>
  <div id="new-item" v-show="tab==='new-item'" class="table-wrapper">
    <table id="new-item-table" class="tbl" v-show="tab==='new-item'">
      <thead>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Item Type:</td>
        <td><select id="item-type" name="item-type" required v-model="newItemType">
          <option value="paint">Paint</option>
          <option value="other" disabled>Other</option>
        </select></td>
      </tr>
      <tr>
        <td v-if="newItemType!=='paint'">Name:</td>
        <td v-if="newItemType==='paint'">Colour:</td>
        <td><input type="text" id="item-name" name="item-name" required v-model="newItemName"></td>
      </tr>
      <tr>
        <td>Quantity:</td>
        <td><input type="number" id="item-quantity" name="item-quantity" min="0" required v-model="newItemQuantity"></td>
      </tr>
      <tr>
        <td>Stock Type:</td>
        <td><select id="item-stock" name="item-stock" required v-model="newItemStock">
          <option value="Available">Available</option>
          <option value="Running Low">Running Low</option>
          <option value="Out of Stock">Out of Stock</option>
        </select></td>
      </tr>
      <tr>
        <td></td>
        <td><button type="button" id="submit-item" v-on:click="submitNewItem">
          Add Item
        </button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { BACKEND_ADDR} from "@/const";

export default {
  name: "InventoryPage",
  data() {
    return {
      greeting: 'BC Paint Co. Inventory!',
      paintStockHeader: 'Paint Stock Chart',
      paintStockCats: ["Available", "Running Low", "Out of Stock"],
      userData: {},
      inventoryData: [],
      muButton: false,
      tab: "inventory",
      errorMessage: '',
      successMessage: '',
      newItemType: 'paint',
      newItemName: '',
      newItemQuantity: 0,
      newItemStock: 'Available'
    };
  },
  mounted() {
    this.fetchUserData();
    this.fetchInventoryData();
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
            this.userData = data;
            if (this.userData.permLevel === 3) this.muButton = true
          }
          else {
            this.userData = {username: "USERNAME UNKNOWN"}
            this.$router.push("/")
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred!';
        });
    },
    fetchInventoryData() {
      fetch(`${BACKEND_ADDR}/data?inventory`, {
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
            this.errorMessage = 'Unable to retrieve inventory data!';
          }
        })
        .then(data => {
          if (data !== undefined) {
            console.log(data)
            for (let i = 0; i < data.length; i++) {
              this.inventoryData.push(data[i])
            }
          }
          else {
            this.inventoryData = {}
            this.$router.push("/")
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred!';
        });
    },
    signOut() {
      this.clearMessages();
      // POST request to backend
      fetch(`${BACKEND_ADDR}/signout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }, credentials: "include"
      })
        .then(response => {
          if (response.ok) {
            this.successMessage = 'Signed out successfully!';
            this.$router.push('/')
          } else {
            this.errorMessage = 'Failed to sign out!';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred!';
        });
    },
    getPaintByStock(stockType) {
      return this.inventoryData.filter(item => {
        if (item.item !== "paint") return false
        // console.log(`
        // Paint: ${item.colour}
        // Stock Type: ${stockType}
        // Item Stock Type: ${item.stockType}
        // Result: ${stockType === item.stockType}
        // `)
        return stockType === item.stockType
      });
    },
    dragStart(item, event) {
      // Set the dragged data
      event.dataTransfer.setData("text/plain", JSON.stringify(item));
    },
    dropItem(stockType, event) {
      // Handle dropping and update the stock type of the item
      event.preventDefault();
      const item = JSON.parse(event.dataTransfer.getData("text/plain"));
      // eslint-disable-next-line no-unused-vars
      const prevStockType = item.stockType
      item.stockType = stockType;
      const invIndex = this.inventoryData.findIndex(i => i.id === item.id);
      this.inventoryData[invIndex] = item
      // Update stock on backend
      fetch(`${BACKEND_ADDR}/data?paintStock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, credentials: "include",
        body: JSON.stringify(item)
      })
        .then(response => {
          if (response.status === 202) {
            console.log("Updated stock successfully")
            this.inventoryData.sort((a, b) => a.colour.localeCompare(b.colour))
          } else {
            this.errorMessage = 'Failure to update stock';
            item.stockType =  prevStockType
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred!';
          item.stockType =  prevStockType;
          this.inventoryData[invIndex] = item;
        });
    },
    canModify() {
      return this.userData.permLevel >= 2
    },
    displayUserInfo() {
      this.clearMessages();
      this.tab = 'user-info'
    },
    manageUsers() {
      this.clearMessages();
      const dataStr = JSON.stringify(this.userData)
      this.$router.push('/admin?loggedInUserData='+btoa(dataStr))
    },
    clearMessages() {
      this.errorMessage = '';
      this.successMessage = '';
    },
    modifyQuantity(item, mode) {
      this.clearMessages();
      const invIndex = this.inventoryData.findIndex(i => i.id === item.id);
      if (mode === 'increment') {
        item.quantity++
      } else if (mode === 'decrement') {
        if (item.quantity === 0) {
          this.errorMessage = 'Cannot have negative stock!';
          return
        }
        item.quantity--
      }
      this.inventoryData[invIndex] = item
      // Update stock on backend
      fetch(`${BACKEND_ADDR}/data?paintQuantity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, credentials: "include",
        body: JSON.stringify(item)
      })
        .then(response => {
          if (response.status === 202) {
            console.log("Updated stock successfully")
          } else {
            this.errorMessage = 'Failure to update stock';
            if (mode === 'increment') {
              item.quantity--
            } else if (mode === 'decrement') {
              item.quantity++
            }
            this.inventoryData[invIndex] = item
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred!';
          if (mode === 'increment') {
            item.quantity--
          } else if (mode === 'decrement') {
            item.quantity++
          }
          this.inventoryData[invIndex] = item
        });
    },
    refreshInventory() {
      this.clearMessages();
      this.inventoryData = []
      this.fetchInventoryData();
    },
    clearFields() {
      this.newItemType = 'paint';
      this.newItemQuantity = 0;
      this.newItemStock = 'Available';
    },
    newItem() {
      this.clearMessages();
      this.clearFields();
      this.tab='new-item'
      console.log("New Item")
    },
    submitNewItem() {
      this.clearMessages();
      if (this.newItemType !== 'paint') {
        this.errorMessage = 'Only paint items can be added at this time!';
        return
      }
      if (this.newItemQuantity < 0) {
        this.errorMessage = 'Cannot have negative stock!';
        return
      }
      const newPaintItem = {
        item: this.newItemType,
        colour: this.newItemName,
        quantity: this.newItemQuantity,
        stockType: this.newItemStock
      }

      // Update stock on backend
      fetch(`${BACKEND_ADDR}/data?addPaint`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }, credentials: "include",
        body: JSON.stringify(newPaintItem)
      })
      .then(response => {
        if (response.status === 201) {
          this.successMessage = 'Successfully added new item!';
          this.clearFields();
          this.tab = 'inventory'
          // Set item ID to the response from the backend
          response.text().then(text => {
            newPaintItem.id = text
          })
          this.inventoryData.push(newPaintItem)
          this.inventoryData.sort((a, b) => a.colour.localeCompare(b.colour))
        } else {
          this.errorMessage = 'Failure to add new item';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred!';
      });
    },
    deleteItem(itemID) {
      this.clearMessages();
      // Request confirmation before deleting
      if (!confirm('Are you sure you want to delete this item?\nPress "OK" to confirm, or "Cancel" to abort.')) return
      const invIndex = this.inventoryData.findIndex(i => i.id === itemID);
      const item = this.inventoryData[invIndex]
      // Update stock on backend
      fetch(`${BACKEND_ADDR}/data?deleteInventoryItem=${itemID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }, credentials: "include"
      })
      .then(response => {
        if (response.status === 202) {
          console.log("Deleted item successfully")
          this.inventoryData.splice(invIndex, 1)
        } else {
          this.errorMessage = 'Failure to delete item';
          this.inventoryData.push(item)
          this.inventoryData.sort((a, b) => a.colour.localeCompare(b.colour))
        }
      })
      .catch(error => {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred!';
      });
    }
  }
};
</script>

<style scoped>
.stock-types {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  justify-content: center; /* Center items horizontally */
  padding: 0 10px; /* Add padding to the sides */
}

.stock-type {
  flex-basis: calc(33.33% - 20px); /* Three items per row */
  margin: 10px; /* Add spacing between items */
  text-align: center; /* Center text */
  outline: 2px dashed black;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inventory-item {
  outline: 2px solid black;
  width: 150px;
  margin-bottom: 10px;
}

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

@media screen and (max-width: 768px) {
  .stock-type {
    flex-basis: calc(50% - 20px); /* Two items per row on smaller screens */
  }
}

@media screen and (max-width: 480px) {
  .stock-type {
    flex-basis: calc(100% - 20px); /* One item per row on even smaller screens */
  }
}

.droppable-area {
  padding-bottom: 30px;
}

.inventory-item button:not(:last-child) {
  margin-right: 20px;
}

/* Reduce margin between buttons on touch devices */
@media (pointer: none), (pointer: coarse) {
  .inventory-item button:not(:last-child) {
    display: inline-block;
    margin: 2px;
  }
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
