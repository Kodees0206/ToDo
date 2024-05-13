import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

// Define the type for route parameters
type RouteParams = {
  id: string;
};

// Define the interface for ToDo items
interface ToDo {
  id: number;
  title: string;
  description: string;
  date: Date;
  status: boolean;
}

// Get the current date in ISO format
const currentDate = new Date().toISOString().split("T")[0];

function UpdateComponent() {
  const { id } = useParams<RouteParams>();

  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoStatus, setTodoStatus] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get<ToDo>(
        "http://localhost:8080/api/todo/" + id
      );
      const todoData = response.data;
      setTodoTitle(todoData.title);
      setTodoDescription(todoData.description);
      setTodoDate(todoData.date.toString());
      setTodoStatus(todoData.status.toString());
      setLoading(false); // Update loading state once data is fetched
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  }

  async function putData() {
    try {
      const newItem = {
        id: id,
        title: todoTitle,
        description: todoDescription,
        date: new Date(todoDate), // Convert string to Date object
        status: todoStatus === "true", // Convert string to boolean
      };
      // Make a PUT request to update the ToDo item
      const response = await axios.put(
        "http://localhost:8080/api/todo/" + id,
        newItem
      );
      console.log("Todo item updated successfully:", response.data);
      // Optionally, redirect to another page or show a success message
    } catch (error) {
      console.error("Error updating todo:", error);
      // Handle error (e.g., show error message)
    }
  }


  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Form className="mt-5 p-4 text-dark" onSubmit={putData}>
            <h4 className="text-dark">Update Todo</h4>
            {/* Title input field */}
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
              />
            </Form.Group>
            {/* Description input field */}
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={todoDescription}
                onChange={(e) => setTodoDescription(e.target.value)}
              />
            </Form.Group>
            {/* Date input field */}
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={todoDate}
                onChange={(e) => setTodoDate(e.target.value)}
              />
            </Form.Group>
            {/* Status select field */}
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={todoStatus}
                onChange={(e) => setTodoStatus(e.target.value)}
              >
                <option value="true">Completed</option>
                <option value="false">Incomplete</option>
              </Form.Control>
            </Form.Group>
            {/* Button to update the ToDo item */}
            <Button className="mt-4" variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateComponent;
