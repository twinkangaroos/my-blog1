/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { LikeComment } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function LikeCommentUpdateForm(props) {
  const {
    id: idProp,
    likeComment,
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
    like_flag: false,
    post_id: "",
  };
  const [comment_id, setComment_id] = React.useState(initialValues.comment_id);
  const [user_id, setUser_id] = React.useState(initialValues.user_id);
  const [like_flag, setLike_flag] = React.useState(initialValues.like_flag);
  const [post_id, setPost_id] = React.useState(initialValues.post_id);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = likeCommentRecord
      ? { ...initialValues, ...likeCommentRecord }
      : initialValues;
    setComment_id(cleanValues.comment_id);
    setUser_id(cleanValues.user_id);
    setLike_flag(cleanValues.like_flag);
    setPost_id(cleanValues.post_id);
    setErrors({});
  };
  const [likeCommentRecord, setLikeCommentRecord] = React.useState(likeComment);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(LikeComment, idProp)
        : likeComment;
      setLikeCommentRecord(record);
    };
    queryData();
  }, [idProp, likeComment]);
  React.useEffect(resetStateValues, [likeCommentRecord]);
  const validations = {
    comment_id: [],
    user_id: [],
    like_flag: [],
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
          like_flag,
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
            LikeComment.copyOf(likeCommentRecord, (updated) => {
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
      {...getOverrideProps(overrides, "LikeCommentUpdateForm")}
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
              like_flag,
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
              like_flag,
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
      <SwitchField
        label="Like flag"
        defaultChecked={false}
        isDisabled={false}
        isChecked={like_flag}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              comment_id,
              user_id,
              like_flag: value,
              post_id,
            };
            const result = onChange(modelFields);
            value = result?.like_flag ?? value;
          }
          if (errors.like_flag?.hasError) {
            runValidationTasks("like_flag", value);
          }
          setLike_flag(value);
        }}
        onBlur={() => runValidationTasks("like_flag", like_flag)}
        errorMessage={errors.like_flag?.errorMessage}
        hasError={errors.like_flag?.hasError}
        {...getOverrideProps(overrides, "like_flag")}
      ></SwitchField>
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
              like_flag,
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
          isDisabled={!(idProp || likeComment)}
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
              !(idProp || likeComment) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
