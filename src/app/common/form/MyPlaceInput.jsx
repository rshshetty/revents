import React from "react";
import { useField } from "formik";
import { FormField, Label, Segment, List } from "semantic-ui-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
export default function MyPlaceInput({ label, options, ...props }) {
  const [field, meta, helpers] = useField(props);

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => helpers.setValue({ address, latLng }))
      .catch((error) => helpers.setError(error));
  }

  function handleBlur(e) {
    field.onBlur(e);
    if (!field.value.latLng) {
      helpers.setValue({ address: "", latLng: null });
    }
  }

  return (
    <PlacesAutocomplete
      
      value={field.value["address"]}
      onChange={(value) => helpers.setValue({ address: value })}
      onSelect={(value) => handleSelect(value)}
      searchOptions={options}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (            //props of PlacesAutpComplete  
        <FormField error={meta.touched && !!meta.error}>
          <input
            {...getInputProps({                         //to specify the input props showing in the input
              name: field.name,
              onBlur: (e) => handleBlur(e),
              ...props,
            })}
          />
          {meta.touched && meta.error ? (
            <Label basic color='red'>
              {meta.error["address"]}
            </Label>
          ) : null}
          {suggestions?.length > 0 && (
            <Segment
              loading={loading}
              style={{
                marginTop: 0,
                position: "absolute",
                zIndex: 1000,
                width: "100%",
              }}
            >
              <List selection>                                     //type is selection as we have to select from the list
                {suggestions.map((suggestion) => (
                  <List.Item {...getSuggestionItemProps(suggestion)}>
                    <List.Header>
                      {suggestion.formattedSuggestion.mainText}               //Eg: London
                    </List.Header>
                    <List.Description>
                      {suggestion.formattedSuggestion.secondaryText}              //Eg: UK
                    </List.Description>
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
        </FormField>
      )}
    </PlacesAutocomplete>
  );
}
