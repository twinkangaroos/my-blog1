/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { GctNews } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function GctNewsUpdateForm(props) {
  const {
    id: idProp,
    gctNews,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    article_type: "",
    show_date: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [article_type, setArticle_type] = React.useState(
    initialValues.article_type
  );
  const [show_date, setShow_date] = React.useState(initialValues.show_date);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = gctNewsRecord
      ? { ...initialValues, ...gctNewsRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setArticle_type(cleanValues.article_type);
    setShow_date(cleanValues.show_date);
    setErrors({});
  };
  const [gctNewsRecord, setGctNewsRecord] = React.useState(gctNews);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(GctNews, idProp) : gctNews;
      setGctNewsRecord(record);
    };
    queryData();
  }, [idProp, gctNews]);
  React.useEffect(resetStateValues, [gctNewsRecord]);
  const validations = {
    title: [],
    article_type: [],
    show_date: [],
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
          title,
          article_type,
          show_date,
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
            GctNews.copyOf(gctNewsRecord, (updated) => {
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
      {...getOverrideProps(overrides, "GctNewsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              article_type,
              show_date,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Article type"
        isRequired={false}
        isReadOnly={false}
        value={article_type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              article_type: value,
              show_date,
            };
            const result = onChange(modelFields);
            value = result?.article_type ?? value;
          }
          if (errors.article_type?.hasError) {
            runValidationTasks("article_type", value);
          }
          setArticle_type(value);
        }}
        onBlur={() => runValidationTasks("article_type", article_type)}
        errorMessage={errors.article_type?.errorMessage}
        hasError={errors.article_type?.hasError}
        {...getOverrideProps(overrides, "article_type")}
      ></TextField>
      <TextField
        label="Show date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={show_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              article_type,
              show_date: value,
            };
            const result = onChange(modelFields);
            value = result?.show_date ?? value;
          }
          if (errors.show_date?.hasError) {
            runValidationTasks("show_date", value);
          }
          setShow_date(value);
        }}
        onBlur={() => runValidationTasks("show_date", show_date)}
        errorMessage={errors.show_date?.errorMessage}
        hasError={errors.show_date?.hasError}
        {...getOverrideProps(overrides, "show_date")}
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
          isDisabled={!(idProp || gctNews)}
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
              !(idProp || gctNews) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
