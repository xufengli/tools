/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const ProtobufConverter = require('../lib/protobufconverter');
const glob = require('glob');
const ModelManager = require('composer-common').ModelManager;
const fs = require('fs');

require('chai').should();

describe('ProtobufConverter', function() {
    describe('#batch', function() {
        it('check all sample protobufs get converted to valid Composer models', function() {
            const protobufFiles = glob.sync('./test/data/proto/**/*.proto');
            for (let n = 0; n < protobufFiles.length; n++) {
                const modelFile = ProtobufConverter.convert(protobufFiles[n], './out/models');
                const model = fs.readFileSync(modelFile, 'utf8');
                const mm = new ModelManager();
                mm.addModelFile(model,modelFile);
            }
        });
    });
});
