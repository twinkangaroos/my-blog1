/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Recipeclub } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function RecipeclubCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    subtitle: "",
    main_image: "",
    ingredient: "",
    brandsite_url: "",
    directshop_url: "",
    amazon_url: "",
    lohaco_url: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [subtitle, setSubtitle] = React.useState(initialValues.subtitle);
  const [main_image, setMain_image] = React.useState(initialValues.main_image);
  const [ingredient, setIngredient] = React.useState(initialValues.ingredient);
  const [brandsite_url, setBrandsite_url] = React.useState(
    initialValues.brandsite_url
  );
  const [directshop_url, setDirectshop_url] = React.useState(
    initialValues.directshop_url
  );
  const [amazon_url, setAmazon_url] = React.useState(initialValues.amazon_url);
  const [lohaco_url, setLohaco_url] = React.useState(initialValues.lohaco_url);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setSubtitle(initialValues.subtitle);
    setMain_image(initialValues.main_image);
    setIngredient(initialValues.ingredient);
    setBrandsite_url(initialValues.brandsite_url);
    setDirectshop_url(initialValues.directshop_url);
    setAmazon_url(initialValues.amazon_url);
    setLohaco_url(initialValues.lohaco_url);
    setErrors({});
  };
  const validations = {
    title: [],
    subtitle: [],
    main_image: [],
    ingredient: [],
    brandsite_url: [],
    directshop_url: [],
    amazon_url: [],
    lohaco_url: [],
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
          subtitle,
          main_image,
          ingredient,
          brandsite_url,
          directshop_url,
          amazon_url,
          lohaco_url,
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
          await DataStore.save(new Recipeclub(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "RecipeclubCreateForm")}
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
              subtitle,
              main_image,
              ingredient,
              brandsite_url,
              directshop_url,
              amazon_url,
              lohaco_url,
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
        label="Subtitle"
        isRequired={false}
        isReadOnly={false}
        value={subtitle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              subtitle: value,
              main_image,
              ingredient,
              brandsite_url,
              directshop_url,
              amazon_url,
              lohaco_url,
            };
            const result = onChange(modelFields);
            value = result?.subtitle ?? value;
          }
          if (errors.subtitle?.hasError) {
            runValidationTasks("subtitle", value);
          }
          setSubtitle(value);
        }}
        onBlur={() => runValidationTasks("subtitle", subtitle)}
        errorMessage={errors.subtitle?.errorMessage}
        hasError={errors.subtitle?.hasError}
        {...getOverrideProps(overrides, "subtitle")}
      ></TextField>
      <TextField
        label="Main image"
        isRequired={false}
        isReadOnly={false}
        value={main_image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              subtitle,
              main_image: value,
              ingredient,
              brandsite_url,
              directshop_url,
              amazon_url,
              lohaco_url,
            };
            const result = onChange(modelFields);
            value = result?.main_image ?? value;
          }
          if (errors.main_image?.hasError) {
            runValidationTasks("main_image", value);
          }
          setMain_image(value);
        }}
        onBlur={() => runValidationTasks("main_image", main_image)}
        errorMessage={errors.main_image?.errorMessage}
        hasError={errors.main_image?.hasError}
        {...getOverrideProps(overrides, "main_image")}
      ></TextField>
      <TextField
        label="Ingredient"
        isRequired={false}
        isReadOnly={false}
        value={ingredient}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              subtitle,
              main_image,
              ingredient: value,
              brandsite_url,
              directshop_url,
              amazon_url,
              lohaco_url,
            };
            const result = onChange(modelFields);
            value = result?.ingredient ?? value;
          }
          if (errors.ingredient?.hasError) {
            runValidationTasks("ingredient", value);
          }
          setIngredient(value);
        }}
        onBlur={() => runValidationTasks("ingredient", ingredient)}
        errorMessage={errors.ingredient?.errorMessage}
        hasError={errors.ingredient?.hasError}
        {...getOverrideProps(overrides, "ingredient")}
      ></TextField>
      <TextField
        label="Brandsite url"
        isRequired={false}
        isReadOnly={false}
        value={brandsite_url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              subtitle,
              main_image,
              ingredient,
              brandsite_url: value,
              directshop_url,
              amazon_url,
              lohaco_url,
            };
            const result = onChange(modelFields);
            value = result?.brandsite_url ?? value;
          }
          if (errors.brandsite_url?.hasError) {
            runValidationTasks("brandsite_url", value);
          }
          setBrandsite_url(value);
        }}
        onBlur={() => runValidationTasks("brandsite_url", brandsite_url)}
        errorMessage={errors.brandsite_url?.errorMessage}
        hasError={errors.brandsite_url?.hasError}
        {...getOverrideProps(overrides, "brandsite_url")}
      ></TextField>
      <TextField
        label="Directshop url"
        isRequired={false}
        isReadOnly={false}
        value={directshop_url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              subtitle,
              main_image,
              ingredient,
              brandsite_url,
              directshop_url: value,
              amazon_url,
              lohaco_url,
            };
            const result = onChange(modelFields);
            value = result?.directshop_url ?? value;
          }
          if (errors.directshop_url?.hasError) {
            runValidationTasks("directshop_url", value);
          }
          setDirectshop_url(value);
        }}
        onBlur={() => runValidationTasks("directshop_url", directshop_url)}
        errorMessage={errors.directshop_url?.errorMessage}
        hasError={errors.directshop_url?.hasError}
        {...getOverrideProps(overrides, "directshop_url")}
      ></TextField>
      <TextField
        label="Amazon url"
        isRequired={false}
        isReadOnly={false}
        value={amazon_url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              subtitle,
              main_image,
              ingredient,
              brandsite_url,
              directshop_url,
              amazon_url: value,
              lohaco_url,
            };
            const result = onChange(modelFields);
            value = result?.amazon_url ?? value;
          }
          if (errors.amazon_url?.hasError) {
            runValidationTasks("amazon_url", value);
          }
          setAmazon_url(value);
        }}
        onBlur={() => runValidationTasks("amazon_url", amazon_url)}
        errorMessage={errors.amazon_url?.errorMessage}
        hasError={errors.amazon_url?.hasError}
        {...getOverrideProps(overrides, "amazon_url")}
      ></TextField>
      <TextField
        label="Lohaco url"
        isRequired={false}
        isReadOnly={false}
        value={lohaco_url}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              subtitle,
              main_image,
              ingredient,
              brandsite_url,
              directshop_url,
              amazon_url,
              lohaco_url: value,
            };
            const result = onChange(modelFields);
            value = result?.lohaco_url ?? value;
          }
          if (errors.lohaco_url?.hasError) {
            runValidationTasks("lohaco_url", value);
          }
          setLohaco_url(value);
        }}
        onBlur={() => runValidationTasks("lohaco_url", lohaco_url)}
        errorMessage={errors.lohaco_url?.errorMessage}
        hasError={errors.lohaco_url?.hasError}
        {...getOverrideProps(overrides, "lohaco_url")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
