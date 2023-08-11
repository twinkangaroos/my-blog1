/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Comment } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function CommentUpdateForm(props) {
  const {
    id: idProp,
    comment,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    post_id: "",
    user_id: "",
    comment_body: "",
  };
  const [post_id, setPost_id] = React.useState(initialValues.post_id);
  const [user_id, setUser_id] = React.useState(initialValues.user_id);
  const [comment_body, setComment_body] = React.useState(
    initialValues.comment_body
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = commentRecord
      ? { ...initialValues, ...commentRecord }
      : initialValues;
    setPost_id(cleanValues.post_id);
    setUser_id(cleanValues.user_id);
    setComment_body(cleanValues.comment_body);
    setErrors({});
  };
  const [commentRecord, setCommentRecord] = React.useState(comment);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Comment, idProp) : comment;
      setCommentRecord(record);
    };
    queryData();
  }, [idProp, comment]);
  React.useEffect(resetStateValues, [commentRecord]);
  const validations = {
    post_id: [],
    user_id: [],
    comment_body: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          post_id,
          user_id,
          comment_body,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Comment.copyOf(commentRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "CommentUpdateForm")}
      {...rest}
    >
      <TextField
        label="Post id"
        isRequired={false}
        isReadOnly={false}
        value={post_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              post_id: value,
              user_id,
              comment_body,
            };
            const result = onChange(modelFields);
            value = result?.post_id ?? value;
          }
          if (errors.post_id?.hasError) {
            runValidationTasks("post_id", value);
          }
          setPost_id(value);
        }}
        onBlur={() => runValidationTasks("post_id", post_id)}
        errorMessage={errors.post_id?.errorMessage}
        hasError={errors.post_id?.hasError}
        {...getOverrideProps(overrides, "post_id")}
      ></TextField>
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={user_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              post_id,
              user_id: value,
              comment_body,
            };
            const result = onChange(modelFields);
            value = result?.user_id ?? value;
          }
          if (errors.user_id?.hasError) {
            runValidationTasks("user_id", value);
          }
          setUser_id(value);
        }}
        onBlur={() => runValidationTasks("user_id", user_id)}
        errorMessage={errors.user_id?.errorMessage}
        hasError={errors.user_id?.hasError}
        {...getOverrideProps(overrides, "user_id")}
      ></TextField>
      <TextField
        label="Comment body"
        isRequired={false}
        isReadOnly={false}
        value={comment_body}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              post_id,
              user_id,
              comment_body: value,
            };
            const result = onChange(modelFields);
            value = result?.comment_body ?? value;
          }
          if (errors.comment_body?.hasError) {
            runValidationTasks("comment_body", value);
          }
          setComment_body(value);
        }}
        onBlur={() => runValidationTasks("comment_body", comment_body)}
        errorMessage={errors.comment_body?.errorMessage}
        hasError={errors.comment_body?.hasError}
        {...getOverrideProps(overrides, "comment_body")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || comment)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || comment) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
