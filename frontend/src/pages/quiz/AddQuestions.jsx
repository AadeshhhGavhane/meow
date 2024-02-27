import React, { useState } from "react";
import {
  Container,
  Content,
  Form,
  Button,
  FlexboxGrid,
  Panel,
  Input,
  InputGroup,
} from "rsuite";
import { FaQuestion, FaCheck } from "react-icons/fa";
import { MdTopic } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddQuestions() {
  const [subjectName, setSubjectName] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    const questions = {
        question: question,
        options: options,
        correctOption: correctOption,
        subject: subjectName
    };

    try {
      const response = await fetch("http://localhost:8000/api/v1/questions/add-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({questions})
      });
      
      if (response.ok) {
        // Handle success (e.g., show a success message)
        toast.success('Question added successfully!');
        setSubjectName("");
        setQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectOption("");
      } else {
        // Handle error response (e.g., show an error message)
        toast.error('Failed to add question');
      }
    } catch (error) {
      // Handle network errors (e.g., show an error message)
      toast.error('Error adding question');
    }
  };

  const styles = {
    marginBottom: 20,
  };

  return (
    <Container>
      <Content>
        <FlexboxGrid justify="center" style={{ marginTop: 10 }}>
          <FlexboxGrid.Item colspan={12}>
            <Panel bordered>
              <Form fluid>
                <FlexboxGrid justify="center">
                  <FlexboxGrid.Item style={styles}>
                    <h3>Enter Question Details</h3>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
                <InputGroup style={styles}>
                  <InputGroup.Addon>
                    <MdTopic />
                  </InputGroup.Addon>
                  <Input
                    value={subjectName}
                    onChange={(value) => setSubjectName(value)}
                    placeholder="Enter Subject Name"
                  />
                </InputGroup>
                <InputGroup style={styles}>
                  <InputGroup.Addon>
                    <FaQuestion />
                  </InputGroup.Addon>
                  <Input
                    value={question}
                    onChange={(value) => setQuestion(value)}
                    placeholder="Enter Question"
                  />
                </InputGroup>
                {[0, 1, 2, 3].map((index) => (
                  <InputGroup key={index} style={styles}>
                    <InputGroup.Addon>
                      <SlOptions />
                    </InputGroup.Addon>
                    <Input
                      value={options[index]}
                      onChange={(value) => handleOptionChange(index, value)}
                      placeholder={`Enter Option ${index + 1}`}
                    />
                  </InputGroup>
                ))}
                <InputGroup style={styles}>
                  <InputGroup.Addon>
                    <FaCheck />
                  </InputGroup.Addon>
                  <Input
                    value={correctOption}
                    onChange={(value) => setCorrectOption(value)}
                    placeholder="Enter Correct Option"
                  />
                </InputGroup>
                <FlexboxGrid justify="center">
                  <Button onClick={handleSubmit} appearance="primary">
                    Submit
                  </Button>
                </FlexboxGrid>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
      <ToastContainer />
    </Container>
  );
}

export default AddQuestions;
