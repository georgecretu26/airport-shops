import React from "react";
import dynamic from "next/dynamic";
import { FetchStatusDto } from "@/types";

const Loading = dynamic(() => import("../Loading"));
const Error = dynamic(() => import("../Error"));

const withFetchStatus = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WithFetchStatusComponent = (props: P & FetchStatusDto) => {
    const { isLoading, error, ...rest } = props;

    if (isLoading) return <Loading />;
    if (error)
      return <Error message="Error loading data" details={error.message} />;

    return <Component {...(rest as P)} />;
  };

  const componentName = Component.displayName || Component.name || "Component";
  WithFetchStatusComponent.displayName = `withFetchStatus(${componentName})`;

  return WithFetchStatusComponent;
};

export default withFetchStatus;
