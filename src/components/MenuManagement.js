import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MenuManagement.module.css";

const MenuManagement = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    depth: "",
    parent_id: "",
    title: "",
  });
  const [parentTitle, setParentTitle] = useState(""); // Add this state for parent title
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/menus")
      .then(response => {
        setMenus(response.data);
        if (response.data.length > 0) {
          setSelectedMenu(response.data[0]);
        }
      })
      .catch(error => {
        setError("There was an error fetching the menus.");
        console.error(error);
      });
  }, []);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const handleMenuChange = event => {
    const id = event.target.value;
    axios
      .get(`http://127.0.0.1:8000/api/menus/${id}`)
      .then(response => {
        const parentMenu = menus.find(
          menu => menu.id === response.data.parent_id
        );
        setSelectedMenu(response.data);
        setFormData({
          id: response.data.id,
          depth: response.data.depth,
          parent_id: response.data.parent_id,
          title: response.data.title,
        });
        setParentTitle(parentMenu ? parentMenu.title : ""); // Set the parent title
      })
      .catch(error => {
        console.error("There was an error fetching the menu item!", error);
      });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    axios
      .post("http://127.0.0.1:8000/api/menus", formData, {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        alert("Menu item created successfully!");
        setMenus([...menus, response.data]);
      })
      .catch(error => {
        console.error("There was an error creating the menu item!", error);
      });
  };

  const renderMenuTree = (menuList, parentId = null) => {
    return menuList
      .filter(menu => menu.parent_id === parentId)
      .map(menu => (
        <li key={menu.id}>
          <span>{menu.title}</span>
          <ul className={styles.treeSubList}>
            {renderMenuTree(menuList, menu.id)}
          </ul>
        </li>
      ));
  };

  return (
    <div className={styles.menuManagement}>
      <div className={styles.controls}>
        <select className={styles.dropdown} onChange={handleMenuChange}>
          {menus.map(menu => (
            <option key={menu.id} value={menu.id}>
              {menu.title}
            </option>
          ))}
        </select>
        <div className={styles.btnContainer}>
          <button className={styles.controlButton}>Expand All</button>
          <button className={styles.controlButton}>Collapse All</button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.menuTree}>
          <ul className={styles.treeList}>{renderMenuTree(menus)}</ul>
        </div>

        <div className={styles.form}>
          <form onSubmit={handleFormSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Menu ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Depth</label>
              <input
                type="text"
                name="depth"
                value={formData.depth}
                onChange={handleInputChange}
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Parent Menu</label>
              <input
                type="text"
                name="parent_id"
                value={parentTitle} // Display the parent title here
                onChange={handleInputChange}
                className={styles.formInput}
                readOnly // Make it read-only
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={styles.formInput}
              />
            </div>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
