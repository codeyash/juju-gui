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

var juju = {components: {}};
var testUtils = React.addons.TestUtils;

chai.config.includeStack = true;
chai.config.truncateThreshold = 0;

describe('EntityContent', function() {
  var mockEntity;

  beforeAll(function(done) {
    // By loading these files it makes their classes available in the tests.
    YUI().use('entity-content', function() { done(); });
  });

  beforeEach(function() {
    mockEntity = makeEntity();
  });

  afterEach(function() {
    mockEntity = undefined;
  });

  function makeEntity(isBundle) {
      var pojo;
      if (isBundle) {
        pojo = {
          name: 'spinach',
          displayName: 'spinach',
          url: 'http://example.com/spinach',
          downloads: 1000,
          owner: 'test-owner',
          promulgated: true,
          id: 'spinach',
          entityType: 'bundle',
          type: 'bundle'
        };
      } else {
        pojo = {
          name: 'spinach',
          displayName: 'spinach',
          url: 'http://example.com/spinach',
          downloads: 1000,
          owner: 'test-owner',
          promulgated: true,
          id: 'spinach',
          entityType: 'charm',
          type: 'charm',
          iconPath: 'data:image/gif;base64,',
          tags: ['database'],
          description: 'charm description',
          options: {
            username: {
              description: 'Your username',
              type: 'string',
              default: 'spinach'
            },
            password: {
              description: 'Your password',
              type: 'string',
              default: 'abc123'
            }
          }
        };
      }
      mockEntity = {};
      mockEntity.toEntity = sinon.stub().returns(pojo);
      mockEntity.get = function(key) {
        return pojo[key];
      };
      return mockEntity;
  }

  it('can display a charm', function() {
    var renderMarkdown = sinon.spy();
    var getFile = sinon.spy();
    var output = jsTestUtils.shallowRender(
        <juju.components.EntityContent
          entityModel={mockEntity}
          getFile={getFile}
          renderMarkdown={renderMarkdown} />);
    assert.deepEqual(output,
      <div className="row entity-content">
        <div className="inner-wrapper">
          <main className="seven-col append-one">
            <div className="entity-content__description">
              <h2>Description</h2>
              <p>charm description</p>
            </div>
            <juju.components.EntityContentReadme
              entityModel={mockEntity}
              renderMarkdown={renderMarkdown}
              getFile={getFile} />
              <div className="entity-content__configuration" id="configuration">
                <h3>Configuration</h3>
                <dl>
                  <juju.components.EntityContentConfigOption
                    key="username"
                    name="username"
                    description="Your username"
                    type="string"
                    default="spinach" />
                  <juju.components.EntityContentConfigOption
                    key="password"
                    name="password"
                    description="Your password"
                    type="string"
                    default="abc123" />
                </dl>
              </div>
          </main>
        </div>
      </div>);
  });

  it('can display a bundle', function() {
    var renderMarkdown = sinon.spy();
    var getFile = sinon.spy();
    var mockEntity = makeEntity(true);
    var output = jsTestUtils.shallowRender(
        <juju.components.EntityContent
          entityModel={mockEntity}
          getFile={getFile}
          renderMarkdown={renderMarkdown} />);
    assert.deepEqual(output,
      <div className="row entity-content">
        <div className="inner-wrapper">
          <main className="seven-col append-one">
            {undefined}
            <juju.components.EntityContentReadme
              entityModel={mockEntity}
              renderMarkdown={renderMarkdown}
              getFile={getFile} />
            {undefined}
          </main>
        </div>
      </div>);
  });
});