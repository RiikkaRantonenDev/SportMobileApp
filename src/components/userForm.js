import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const VALIDATE_USERFORM = {
  mobileNumber: {
    message: 'Enter your phone number',
    pattern: /^.{8}$/,
    error: "Wrong mobile number format",
  },
  // Other fields pattern and error message ...
}

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.inputs = {};

    this.state = { ...this.generateDoc() };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onSubmit() {
    const doc = this.state;

    this.validateFields();

    this.props.save(doc, () => {
      console.lo('Successfully saved');
    });
  }

  focusField = name => {
    this.inputs[name].focus();
  };

  validateFields() {
    const fields = this.state;

    const names = Object.keys(fields);

    for (const name of names) {
      const validate = VALIDATE_USERFORM[name] || {};

      if (fields[name].length === 0) {
        // Empty
        return console.log(validate.message);
      }

      if (!fields[name].match(validate.pattern)) {
        // Pattern does not match
        return console.log(validate.error);
      }
    }
  }

  generateDoc() {
    const data = this.props.data || {};

    return {
      mobileNumber: data.mobileNumber || '',
      username: data.username || '',
      password: '',
    };
  }

  onInputChange(name, value) {
    this.setState({ [name]: value });
  }

  renderControl(args) {
    const {
      minLength,
      keyboardType,
      secureTextEntry,
      maxLength,
      onSubmitEditing,
      autoFocus,
      name,
      label,
      type,
    } = args;

    let control;

    const props = {
      autoFocus,
      secureTextEntry,
      onSubmitEditing,
      maxLength,
      minLength,
      keyboardType,
    };

    control = (
      <TextInput
        ref={e => (this.inputs[name] = e)}
        value={this.state[name]}
        onChangeText={e => this.onInputChange(name, e)}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        returnKeyType="next"
        {...props}
      />
    );

    return this.renderField(label, control);
  }

  renderField(label, control) {
    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}*</Text>
        {control}
      </View>
    );
  }

  renderForm() {
    return (
      <View style={styles.wrapper}>
        <KeyboardAwareScrollView>
          {this.renderControl({
            name: 'mobileNumber',
            label: 'Mobile number',
            maxLength: 10,
            onSubmitEditing: () => this.focusField('username')
          })}
          {this.renderControl({
            name: 'username',
            label: 'Username',
            maxLength: 16,
            minLength: 6,
            onSubmitEditing: () => this.focusField('Password'),
          })}
          {this.renderControl({
            name: 'password',
            label: 'Password',
            maxLength: 16,
            minLength: 6,
            secureTextyEntry: true
          })}
        </KeyboardAwareScrollView>
      </View>
    );
  }

  renderButton(label, onPress) {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{label.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }

  renderFooter() {
    return (
      <View style={styles.footer}>
        {this.renderButton('Save', this.onSubmit)}
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderForm()}
        {this.renderFooter()}
      </View>
    );
  }
}

export default UserForm;