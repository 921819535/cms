//===================== ��֤��(2012-09-30) =====================//
$JS.extend({
    validator: {
        //������ʾ
        setTip: function (e, success, summaryKey, msg) {

            //���ݼ�ֵ��ȡ��ʾ��Ϣ
            if (summaryKey) {
                var summary = e.getAttribute('summary');
                if (summary) {
                    summary = $JS.toJson(summary);
                    if (summary[summaryKey]) {
                        msg = summary[summaryKey];
                    }
                }
            }

            //�����������ʾ��Ϣ����
            if (e.getAttribute('tipin')) {
                var tipin = document.getElementById(e.getAttribute('tipin'));
                if (tipin) {
                    if (tipin.className.indexOf('validator') == -1) {
                        tipin.className += ' validator';
                    }
                    tipin.innerHTML = '<span class="' + (success ? 'valid-right' : 'valid-error') + '"><span class="msg">' + msg + '</span></span>';
                    return false;
                }
            }


            //δָ����ʾ��Ϣ����,��������ʾ������
            var tipID = e.getAttribute('validate_id');
            var tipEle = document.getElementById(tipID);
            if (!tipEle) {
                tipEle = document.createElement('DIV');
                tipEle.id = tipID;
                tipEle.className = 'validator';

                var pos = $JS.getPosition(e);

                tipEle.style.cssText = 'position:absolute;left:' + (pos.right + document.documentElement.scrollLeft) + 'px;top:'
                        + (pos.top + document.documentElement.scrollTop) + 'px';
                document.body.appendChild(tipEle);
            }

            //����ֵ
            tipEle.innerHTML = '<span class="' + (success ? 'valid-right' : 'valid-error') + '"><span class="msg">' + msg + '</span></span>';

        },
        //�Ƴ���ʾ
        removeTip: function (e) {

            //���ָ������ʾ��Ϣ����
            if (e.getAttribute('tipin')) {
                var tipin = document.getElementById(e.getAttribute('tipin'));
                if (tipin) {
                    tipin.innerHTML = '';
                    return false;
                }
            }

            //���δָ����ʾ��Ϣ����
            var tipEle = document.getElementById(e.getAttribute('validate_id'));
            if (tipEle) {
                document.body.removeChild(tipEle);
            }

        },
        //��֤���
        result: function (id) {
            //ָ���˸�Ԫ��
            if (id) {
                var isSuccess = true;
                var ele = document.getElementById(id);
                $JS.each($JS.getElementsByClassName(ele, 'ui-validate'), function (i, e) {
                    if (isSuccess) {
                        //��ȡ��ʾ��ָ��λ�õ���Ϣ
                        if (e.getAttribute('tipin')) {
                            if ($JS.$(e.getAttribute('tipin')).innerHTML.indexOf('valid-error') != -1) {
                                isSuccess = false;
                            }
                        } else {

                            //��ȡ��������Ϣ
                            e = document.getElementById(e.getAttribute('validate_id'));

                            if ($JS.getElementsByClassName(e, 'valid-error').length != 0) {
                                isSuccess = false;
                            }
                        }
                    }
                });
                return isSuccess;

            } else {
                return $JS.getElementsByClassName(document, 'valid-error').length == 0;
            }
        },

        //��ʼ���¼�
        init: function () {
            var $J = window.J;
            if (!$J) {
                alert('δ���ú��Ŀ�!');
                return false;
            }

            var eles = document.getElementsByClassName('ui-validate');
            var tipID;

            for (var i = 0; i < eles.length; i++) {

                tipID = eles[i].getAttribute('validate_id');
                while (tipID == null) {
                    tipID = eles[i].id;
                    if (tipID && tipID != '') {
                        tipID = 'validate_item_' + tipID;
                    } else {
                        tipID = 'validate_item_' + parseInt(Math.random() * 1000).toString();
                    }

                    if (document.getElementById(tipID) != null) {
                        tipID = null;
                    } else {
                        eles[i].setAttribute('validate_id', tipID);
                    }
                }

                //��֤������
                var validFuncs = new Array();

                //��ӱ�����¼�
                if (eles[i].onblur) {
                    validFuncs[validFuncs.length] = eles[i].onblur;
                }

                //ֻ����������
                if (eles[i].getAttribute('isnumber') == 'true') {

                    eles[i].style.cssText += 'ime-mode:disabled';
                    var func = (function (validater, e) {
                        return function () {
                            if (/\D/.test(e.value)) {
                                e.value = e.value.replace(/\D/g, '');
                            }
                            e.value = e.value.replace(/^0([0-9])/, '$1');
                        };
                    })(this, eles[i]);

                    $J.event.add(eles[i], 'keyup', func);
                    $J.event.add(eles[i], 'change', func);
                }

                //============= ʹ��������ʽ ==============/
                if (eles[i].getAttribute('regex')) {
                    var func = (function (validator, e) {
                        return function () {
                            var reg = new RegExp();
                            reg.compile(e.getAttribute('regex'));
                            if (!reg.test(e.value)) {
                                validator.setTip(e, false, 'regex', '���벻��ȷ');
                            } else {
                                validator.removeTip(e);
                            }
                        };
                    })(this, eles[i]);

                    //��������֤�¼�
                    validFuncs[validFuncs.length] = func;

                } else {
                    //================ ����У�� =================/

                    //����Ϊ��
                    if (eles[i].getAttribute('isrequired') == 'true' || eles[i].getAttribute('required') == 'true') {
                        var func = (function (validator, e) {
                            return function () {
                                if (e.value.replace(/\s/g, '') == '') {
                                    validator.setTip(e, false, 'required', '�����Ϊ��');
                                } else {
                                    validator.removeTip(e);
                                }
                            };
                        })(this, eles[i]);

                        //�󶨿�ֵ��֤�¼�
                        validFuncs[validFuncs.length] = func;
                    }


                    //��������
                    if (eles[i].getAttribute('length')) {
                        var func = (function (validator, e) {
                            return function () {
                                var pro_val = e.getAttribute('length');
                                var reg = /\[(\d*),(\d*)\]/ig;
                                var l_s = parseInt(pro_val.replace(reg, '$1')),
                                    l_e = parseInt(pro_val.replace(reg, '$2'));

                                if (e.value.length < l_s) {
                                    validator.setTip(e, false, 'length', l_e ? '���ȱ���Ϊ' + l_s + '-' + l_e + 'λ' : '���ȱ������' + (l_s - 1) + 'λ');
                                } else if (e.value.length > l_e) {
                                    validator.setTip(e, false, 'length', l_s ? '���ȱ���Ϊ' + l_s + '-' + l_e + 'λ' : '���ȱ���С��' + (l_e + 1) + 'λ');
                                } else if (e.getAttribute('required') == null || e.value.length > 0) {
                                    validator.removeTip(e);
                                }
                            };
                        })(this, eles[i]);

                        //�󶨳�����֤�¼�
                        validFuncs[validFuncs.length] = func;
                    }

                }


                var callFuncs = (function (funcs) {
                    return function () {
                        for (var i = 0; i < funcs.length; i++) {
                            if (funcs[i]) {
                                //�����������
                                funcs[i].apply(this, arguments);
                                // _funcs[i]();
                            }
                        }
                    };
                })(validFuncs);

                eles[i].onblur = callFuncs;

                //���keyup
                // $JS.event.add(eles[i], 'keyup', callFuncs);
            }
        },

        validate: function (id) {
            var eles;
            if (id) {
                //ָ���˸�Ԫ��
                eles = $JS.getElementsByClassName(document.getElementById(id), 'ui-validate');

            } else {
                //����Ԫ�أ�δָ����Ԫ��
                eles = $JS.getElementsByClassName(document, 'ui-validate');
            }

            var chkV = function (e) {
                return e.getAttribute('required') == "true" ||
                    e.getAttribute('isrequired') == "true" ||
                    e.getAttribute('length') ||
                    e.getAttribute('regex');
            };

            for (var i = 0; i < eles.length; i++) {
                if (chkV(eles[i])) {
                    if (eles[i].onblur) { 
                        eles[i].onblur();
                    }
                }
            }
            return this.result(id);
        }
    }
});

$JS.event.add(window, 'load', function () {
    $JS.validator.init();
});