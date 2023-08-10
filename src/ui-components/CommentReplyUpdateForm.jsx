/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { CommentReply } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function CommentReplyUpdateForm(props) {
  const {
    id: idProp,
    commentReply,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    comment_id: "",
    user_id: "",
    comment: "",
    post_id: "",
  };
  const [comment_id, setComment_id] = React.useState(initialValues.comment_id);
  const [user_id, setUser_id] = React.useState(initialValues.user_id);
  const [comment, setComment] = React.useState(initialValues.comment);
  const [post_id, setPost_id] = React.useState(initialValues.post_id);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = commentReplyRecord
      ? { ...initialValues, ...commentReplyRecord }
      : initialValues;
    setComment_id(cleanValues.comment_id);
    setUser_id(cleanValues.user_id);
    setComment(cleanValues.comment);
    setPost_id(cleanValues.post_id);
    setErrors({});
  };
  const [commentReplyRecord, setCommentReplyRecord] =
    React.useState(commentReply);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(CommentReply, idProp)
        : commentReply;
      setCommentReplyRecord(record);
    };
    queryData();
  }, [idProp, commentReply]);
  React.useEffect(resetStateValues, [commentReplyRecord]);
  const validations = {
    comment_id: [],
    user_id: [],
    comment: [],
    post_id: [],
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
          comment_id,
          user_id,
          comment,
          post_id,
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
            CommentReply.copyOf(commentReplyRecord, (updated) => {
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
      {...getOverrideProps(overrides, "CommentReplyUpdateForm")}
      {...rest}
    >
      <TextField
        label="Comment id"
        isRequired={false}
        isReadOnly={false}
        value={comment_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              comment_id: value,
              user_id,
              comment,
              post_id,
            };
            const result = onChange(modelFields);
            value = result?.comment_id ?? value;
          }
          if (errors.comment_id?.hasError) {
            runValidationTasks("comment_id", value);
          }
          setComment_id(value);
        }}
        onBlur={() => runValidationTasks("comment_id", comment_id)}
        errorMessage={errors.comment_id?.errorMessage}
        hasError={errors.comment_id?.hasError}
        {...getOverrideProps(overrides, "comment_id")}
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
              comment_id,
              user_id: value,
              comment,
              post_id,
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
        label="Comment"
        isRequired={false}
        isReadOnly={false}
        value={comment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              comment_id,
              user_id,
              comment: value,
              post_id,
            };
            const result = onChange(modelFields);
            value = result?.comment ?? value;
          }
          if (errors.comment?.hasError) {
            runValidationTasks("comment", value);
          }
          setComment(value);
        }}
        onBlur={() => runValidationTasks("comment", comment)}
        errorMessage={errors.comment?.errorMessage}
        hasError={errors.comment?.hasError}
        {...getOverrideProps(overrides, "comment")}
      ></TextField>
      <TextField
        label="Post id"
        isRequired={false}
        isReadOnly={false}
        value={post_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              comment_id,
              user_id,
              comment,
              post_id: value,
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
          isDisabled={!(idProp || commentReply)}
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
              !(idProp || commentReply) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}