import ScreenWrapper from "@/components/ScreenWrapper";
import React from "react";
import FormSelector from "./form-selector";
import Form from "./form";
import { useTranslation } from "react-i18next";

export default function Add() {
  const { t } = useTranslation();

  return (
    <ScreenWrapper title={t("add:add-entry")}>
      <FormSelector />
      <Form />
    </ScreenWrapper>
  );
}
