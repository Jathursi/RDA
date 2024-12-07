import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li>Home</li>
          <li>Forms</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <input type="text" placeholder="Search..." />
          <div className="profile">
            <span>User</span>
          </div>
        </header>

        {/* Form Section */}
        <section className="form-section">
          <h1>Fill the Form</h1>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="options">Options</label>
              <select id="options">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" />
                Agree to Terms
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

// import React, { useState } from 'react';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [hoveredMenu, setHoveredMenu] = useState(null);

//   const handleMouseEnter = (menu) => {
//     setHoveredMenu(menu);
//   };

//   const handleMouseLeave = () => {
//     setHoveredMenu(null);
//   };

//   return (
//     <div className="dashboard">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div
//           className="menu-item"
//           onMouseEnter={() => handleMouseEnter('home')}
//           onMouseLeave={handleMouseLeave}
//         >
//           Home
//           {hoveredMenu === 'home' && <div className="submenu">Dashboard Overview</div>}
//         </div>
//         <div
//           className="menu-item"
//           onMouseEnter={() => handleMouseEnter('forms')}
//           onMouseLeave={handleMouseLeave}
//         >
//           Forms
//           {hoveredMenu === 'forms' && <div className="submenu">Manage Forms</div>}
//         </div>
//         <div
//           className="menu-item"
//           onMouseEnter={() => handleMouseEnter('reports')}
//           onMouseLeave={handleMouseLeave}
//         >
//           Reports
//           {hoveredMenu === 'reports' && <div className="submenu">Generate Reports</div>}
//         </div>
//         <div
//           className="menu-item"
//           onMouseEnter={() => handleMouseEnter('settings')}
//           onMouseLeave={handleMouseLeave}
//         >
//           Settings
//           {hoveredMenu === 'settings' && <div className="submenu">Adjust Preferences</div>}
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Top Navigation */}
//         <header className="top-nav">
//           <h1>Dashboard</h1>
//           <input type="text" placeholder="Search..." />
//         </header>

//         {/* Content Area */}
//         <section className="content">
//           <h2>Welcome to the Dashboard</h2>
//           <p>Select an option from the sidebar to begin.</p>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
