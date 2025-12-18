import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/workflow.css";
import userImg from "../image/images.jpg";


interface Workflow {
  id: string;
  name: string;
  state: "active" | "paused" | "inactive";
  owner: string;
  runs: string;
  schedule: string;
  lastRun: string | null;
  nextRun: string | null;
}

const WorkflowTable = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/workflows"
        );
        setWorkflows(response.data);
      } catch {
        setError("Failed to load workflows");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  if (loading) return <div className="loader">Loading workflows...</div>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-top">
  <div className="logo"></div>

  {/* Sidebar collapse icon */}
  <div className="sidebar-collapse">❮</div>

  <button className="sidebar-new-btn">New</button>
</div>

        <ul className="sidebar-menu">
          <li><span className="icon">🏠</span> Workspace</li>
          <li><span className="icon">🕒</span> Recent</li>
          <li><span className="icon">📦</span> Catalog</li>
          <li className="active"><span className="icon">⚙️</span> Workflow</li>
          <li><span className="icon">☁️</span> Compute</li>

          <li className="group-main">SQL</li>
          <li className="sub-item"><span className="icon">✎</span> SQL Editor</li>
          <li className="sub-item"><span className="icon">📊</span> Dashboard</li>

          <li className="group-main">DATA ENGINEERING</li>
          <li className="sub-item"><span className="icon">🔄</span> Job Runs</li>

          <li className="group-main">MACHINE LEARNING</li>
          <li className="sub-item"><span className="icon">🎮</span> Play Ground</li>

        </ul>
      </aside>

      {/* Main Area */}
      <main className="main-area">
        {/* Page Header */}
        <div className="page-header">
  <div className="header-row">
    <div>
      <h1>Workflow List</h1>
      <p>A short description will be placed right over here</p>
    </div>

    <div className="top-actions">
      <div className="header-search-group">
        <div className="global-search">
          <input
            type="text"
            placeholder="Search data, notebooks, recents and more"
          />
          <span className="search-icon">🔍</span>
          <span className="kbd-hint">⌘ + K</span>
        </div>

        <div className="header-icons">
          <div className="bell-icon">🔔</div>
          <div className="avatar">
            <img src={userImg} alt="User" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Tabs */}
        <div className="tabs">
          <button className="tab active">
            All <span>12</span>
          </button>
          <button className="tab">
            Active <span>7</span>
          </button>
          <button className="tab paused">
            Paused <span>4</span>
          </button>
        </div>

        {/* Actions */}
        <div className="actions-bar">
          <input
            className="local-search"
            placeholder="Search by workflow and tasks"
          />

          <div className="actions-right">
            <select>
              <option>Created by</option>
            </select>

            <label className="pinned-select">
              <input type="checkbox" />
              <span>Only pinned</span>
            </label>

            <button className="icon-btn">≡</button>
            <button className="create-btn">Create Workflow</button>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="workflow-table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Owner</th>
                <th>Runs</th>
                <th>Schedule</th>
                <th>Last Run</th>
                <th>Next Run</th>
              </tr>
            </thead>

            <tbody>
              {workflows.map((wf) => (
                <tr key={wf.id}>
                  <input
                      type="checkbox"
                      role="switch"
                      className="state-switch"
                    />

                  <td>
                    <div className="wf-name">{wf.name}</div>
                    <div className="wf-tags">
                      <span>kubernetes</span>
                      <span>spark</span>
                    </div>
                  </td>

                  <td className="owner-pill">{wf.owner}</td>

                  <td className="runs">
                  <span className="run-circle neutral">0</span>
                  <span className="run-circle success">0</span>
                  <span className="run-circle neutral">0</span>
                  <span className="run-circle danger">0</span>
                </td>

                  <td>{wf.schedule || "—"}</td>
                  <td>{wf.lastRun || "—"}</td>
                  <td>{wf.nextRun || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default WorkflowTable;
