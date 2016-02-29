/*
This file is part of the Juju GUI, which lets users view and manage Juju
environments within a graphical interface (https://launchpad.net/juju-gui).
Copyright (C) 2015 Canonical Ltd.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License version 3, as published by
the Free Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranties of MERCHANTABILITY,
SATISFACTORY QUALITY, or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero
General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

var juju = {components: {}}; // eslint-disable-line no-unused-vars
var testUtils = React.addons.TestUtils;

chai.config.includeStack = true;
chai.config.truncateThreshold = 0;

describe('HeaderBreadcrumb', () => {

  beforeAll((done) => {
    // By loading this file it adds the component to the juju components.
    YUI().use('header-breadcrumb', () => { done(); });
  });

  it('Renders properly', () => {
    var app = {app:'app'};
    var env = {env: 'env'};
    var envName = 'bar';
    var dbEnvironmentSet = sinon.stub();
    var jem = {jem: 'jem'};
    var envList = ['envList'];
    var changeState = sinon.stub();
    var showConnectingMask = sinon.stub();
    var authDetails = {user: {name: 'foo'}};
    var output = jsTestUtils.shallowRender(
      <juju.components.HeaderBreadcrumb
        app={app}
        env={env}
        envName={envName}
        dbEnvironmentSet={dbEnvironmentSet}
        jem={jem}
        envList={envList}
        changeState={changeState}
        showConnectingMask={showConnectingMask}
        authDetails={authDetails}
        showEnvSwitcher={true} />);

    var expected = (
      <ul className="header-breadcrumb">
        <li className="header-breadcrumb__list-item"></li>
        <li className="header-breadcrumb__list-item">
          <a className="header-breadcrumb--link" href="/profile/">
            foo
          </a>
        </li>
        <li className="header-breadcrumb__list-item">
          <window.juju.components.EnvSwitcher
            app={app}
            env={env}
            environmentName={envName}
            dbEnvironmentSet={dbEnvironmentSet}
            jem={jem}
            envList={envList}
            changeState={changeState}
            showConnectingMask={showConnectingMask}
            authDetails={authDetails} />
        </li>
      </ul>
    );
    assert.deepEqual(output, expected);
  });

  it('defaults username to anonymous if none is provided', () => {
    var app = {app:'app'};
    var env = {env: 'env'};
    var envName = 'bar';
    var dbEnvironmentSet = sinon.stub();
    var jem = {jem: 'jem'};
    var envList = ['envList'];
    var changeState = sinon.stub();
    var showConnectingMask = sinon.stub();
    var output = jsTestUtils.shallowRender(
      <juju.components.HeaderBreadcrumb
        app={app}
        env={env}
        envName={envName}
        dbEnvironmentSet={dbEnvironmentSet}
        jem={jem}
        envList={envList}
        changeState={changeState}
        showConnectingMask={showConnectingMask}
        showEnvSwitcher={true} />);
    assert.equal(
      output.props.children[1].props.children.props.children, 'anonymous');
  });

  it('does not render the env switcher if told not to', () => {
    var app = {app:'app'};
    var env = {env: 'env'};
    var envName = 'bar';
    var dbEnvironmentSet = sinon.stub();
    var jem = {jem: 'jem'};
    var envList = ['envList'];
    var changeState = sinon.stub();
    var showConnectingMask = sinon.stub();
    var output = jsTestUtils.shallowRender(
      <juju.components.HeaderBreadcrumb
        app={app}
        env={env}
        envName={envName}
        dbEnvironmentSet={dbEnvironmentSet}
        jem={jem}
        envList={envList}
        changeState={changeState}
        showConnectingMask={showConnectingMask}
        showEnvSwitcher={false} />);
    // There will be no third child if the envSwitcher is rendered
    assert.equal(output.props.children[2], undefined);
  });

});
