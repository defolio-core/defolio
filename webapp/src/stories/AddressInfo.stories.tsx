import { AddressInfo } from "../components/AddressInfo";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AddressInfo> = {
  component: AddressInfo,
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <AddressInfo
      address="0xFdaAc16d3bE97F8DD562218BFc913055901Be15e"
    />
  ),
};

export const DefaultWithExplorer: StoryObj = {
  render: () => (
    <AddressInfo
      className="text-primary"
      address="0xFdaAc16d3bE97F8DD562218BFc913055901Be15e"
      explorer
    />
  ),
};

export const Short: StoryObj = {
  render: () => (
    <AddressInfo
      address="0xFdaAc16d3bE97F8DD562218BFc913055901Be15e"
      short
    />
  ),
};

export const ShortWithExplorer: StoryObj = {
  render: () => (
    <AddressInfo
      className="text-primary"
      address="0xFdaAc16d3bE97F8DD562218BFc913055901Be15e"
      explorer
      short
    />
  ),
};