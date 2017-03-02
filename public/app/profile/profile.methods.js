(function() {
    'use strict';
    var profileMethods = {
        template: `
            <div class="list-group table-of-contents" id="profile-list-group">
              <a ui-sref-active="active" class="list-group-item" ui-sref="profile.user">user</a>
              <a ui-sref-active="active" class="list-group-item" ui-sref="profile.billing">billing</a>
              <a ui-sref-active="active" class="list-group-item" ui-sref="profile.notifications">notifications</a>
              <a ui-sref-active="active" class="list-group-item" ui-sref="profile.security">security</a>
              <a ui-sref-active="active" class="list-group-item" ui-sref="profile.saved">saved</a>
              <a ui-sref-active="active" class="list-group-item" ui-sref="profile.admin">admin</a>
            </div>
        `
    };
    angular
        .module('profile')
        .component('profileMethods', profileMethods);
})();
